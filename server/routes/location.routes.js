const express = require('express');
const router = express.Router();

const NOMINATIM_USER_AGENT = "EVChargeHub/1.0";

// 1. Suggest Locations
router.get("/suggest", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

        const params = new URLSearchParams({
            format: "json",
            countrycodes: "in",
            q: q,
            addressdetails: "1",
            limit: "5"
        });

        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
            headers: { "User-Agent": NOMINATIM_USER_AGENT }
        });

        const data = await response.json();
        
        const suggestions = data.map(item => ({
            name: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon)
        }));

        res.json({ suggestions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Geocode Address
router.get("/geocode", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

        const params = new URLSearchParams({
            format: "json",
            countrycodes: "in",
            q: q,
            limit: "1",
            addressdetails: "1"
        });

        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
            headers: { "User-Agent": NOMINATIM_USER_AGENT }
        });

        const data = await response.json();

        if (!data || data.length === 0) {
            return res.json({
                found: false,
                message: "No matching location found.",
                coords: null
            });
        }

        const result = data[0];
        res.json({
            found: true,
            name: result.display_name,
            lat: parseFloat(result.lat),
            lon: parseFloat(result.lon),
            address: result.address || {}
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Reverse Geocode
router.get("/reverse-geocode", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ error: "lat and lon are required" });

        const params = new URLSearchParams({
            format: "json",
            lat: lat,
            lon: lon,
            countrycodes: "in",
            addressdetails: "1"
        });

        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`, {
            headers: { "User-Agent": NOMINATIM_USER_AGENT }
        });

        const data = await response.json();

        if (data.error) {
            return res.json({
                found: false,
                message: "Reverse geocoding failed.",
                address: null
            });
        }

        res.json({
            found: true,
            name: data.display_name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            address: data.address || {}
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
