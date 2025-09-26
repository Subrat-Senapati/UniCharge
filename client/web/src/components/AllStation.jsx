import React, { useCallback, useRef } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import stations from "../data/stations.json";

const containerStyle = {
    width: "100%",
    height: "500px"
};

const AllStation = () => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const [selected, setSelected] = React.useState(null);
    const mapRef = useRef(null);

    // When map loads → fit bounds to show all stations
    const onLoad = useCallback((map) => {
        mapRef.current = map;
        const bounds = new window.google.maps.LatLngBounds();
        stations.forEach((station) =>
            bounds.extend({ lat: station.latitude, lng: station.longitude })
        );
        map.fitBounds(bounds); // auto zoom + center
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                scrollwheel: false,            // disables zoom with mouse wheel
                gestureHandling: "greedy"      // optional: use "none" to disable all gestures
            }}
        >
            {stations.map((station) => (
                <Marker
                    key={station.id}
                    position={{ lat: station.latitude, lng: station.longitude }}
                    onClick={() => setSelected(station)}
                />
            ))}

            {selected && (
                <InfoWindow
                    position={{ lat: selected.latitude, lng: selected.longitude }}
                    onCloseClick={() => setSelected(null)}
                >
                    <div>
                        <h3 className="font-bold">{selected.name}</h3>
                        <p>Lat: {selected.latitude}</p>
                        <p>Lng: {selected.longitude}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    ) : (
        <p>Loading Map...</p>
    );
};

export default AllStation;
