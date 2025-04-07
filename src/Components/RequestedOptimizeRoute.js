import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 37.7749, lng: -122.4194 };

const OptimizedRouteMap = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBoUIrQCGUbFsvBsSByRJ-kPHGLtRDNC3c",
  });
  
  console.log("isLoaded: ", isLoaded);

  const getRoute = async () => {
    if (!pickup || !dropoff) {
      alert("Enter both locations");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: dropoff,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          alert("Could not fetch route. Try again.");
        }
      }
    );
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full mb-2 p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Drop-off location"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          className="w-full mb-2 p-2 border rounded-md"
        />
        <button
          onClick={getRoute}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          View Optimized Route
        </button>
      </div>

      <div className="w-full h-[500px]">
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default OptimizedRouteMap;
