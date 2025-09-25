import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const stations = [
  { name: "Station A", lat: 28.6139, lng: 77.2090 },
  { name: "Station B", lat: 19.0760, lng: 72.8777 },
  { name: "Station C", lat: 13.0827, lng: 80.2707 }
];

const Location = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  });

  const [userLoc, setUserLoc] = useState(null);
  const [nearest, setNearest] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLoc(loc);

        // Find nearest station
        let minDist = Infinity, nearestStation = null;
        stations.forEach(st => {
          const dist = Math.sqrt((loc.lat - st.lat) ** 2 + (loc.lng - st.lng) ** 2);
          if (dist < minDist) {
            minDist = dist;
            nearestStation = st;
          }
        });
        setNearest(nearestStation);
      });
    }
  }, []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={{ width: "100%", height: "500px" }}
      center={userLoc || { lat: 20.5937, lng: 78.9629 }}
      zoom={5}
    >
      {stations.map((s, i) => <Marker key={i} position={{ lat: s.lat, lng: s.lng }} title={s.name} />)}
      {userLoc && <Marker position={userLoc} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />}
      {userLoc && nearest && (
        <Polyline path={[userLoc, { lat: nearest.lat, lng: nearest.lng }]} options={{ strokeColor: "red" }} />
      )}
    </GoogleMap>
  ) : <p>Loading...</p>;
}

export default Location