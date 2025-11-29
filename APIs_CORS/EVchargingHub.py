from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

# CORS – allow your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # Add your domain later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"

@app.get("/api/suggest")
async def suggest_locations(q: str = Query(..., min_length=1)):
    try:
        params = {
            "format": "json",
            "countrycodes": "in",     # INDIA ONLY
            "q": q,
            "addressdetails": 1,
            "limit": 5
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(
                NOMINATIM_URL,
                params=params,
                headers={"User-Agent": "EVChargeHub/1.0"}
            )

        results = response.json()

        suggestions = [
            {
                "name": item["display_name"],
                "lat": float(item["lat"]),
                "lon": float(item["lon"])
            }
            for item in results
        ]
        return {"suggestions": suggestions}
    except Exception as e:
        return {"error": str(e)}
@app.get("/api/geocode")
async def geocode_address(q: str = Query(..., min_length=1)):
    """
    Geocode an address and return the best matching location (limit=1).
    India-only results.
    """
    try:
        params = {
            "format": "json",
            "countrycodes": "in",    # INDIA
            "q": q,
            "limit": 1,
            "addressdetails": 1
        }
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://nominatim.openstreetmap.org/search",
                params=params,
                headers={"User-Agent": "EVChargeHub/1.0"}
            )
        data = response.json()
        # If no results
        if not data:
            return {
                "found": False,
                "message": "No matching location found.",
                "coords": None
            }
        # Extract best match
        result = data[0]

        return {
            "found": True,
            "name": result.get("display_name"),
            "lat": float(result["lat"]),
            "lon": float(result["lon"]),
            "address": result.get("address", {})
        }
    except Exception as e:
        return {"error": str(e)}
@app.get("/api/reverse-geocode")
async def reverse_geocode(
    lat: float = Query(...),
    lon: float = Query(...)
):
    """
    Reverse geocode coordinates (lat, lon) to a readable place name.
    India-only.
    """
    try:
        params = {
            "lat": lat,
            "lon": lon,
            "format": "json",
            "countrycodes": "in",
            "addressdetails": 1
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://nominatim.openstreetmap.org/reverse",
                params=params,
                headers={"User-Agent": "EVChargeHub/1.0"}
            )

        data = response.json()

        if "error" in data:
            return {
                "found": False,
                "message": "Reverse geocoding failed.",
                "address": None
            }

        return {
            "found": True,
            "name": data.get("display_name"),
            "lat": lat,
            "lon": lon,
            "address": data.get("address", {})
        }

    except Exception as e:
        return {"error": str(e)}

