/* global google */
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function RideRequestMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
  });

  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(false);

  const geocodeAddress = async (address) => {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          reject(`Geocode failed: ${status}`);
        }
      });
    });
  };

  const handleRequestRide = async () => {
    try {
      setLoading(true);
      const pickupLoc = await geocodeAddress(pickupAddress);
      const dropoffLoc = await geocodeAddress(dropoffAddress);

      const pickup = {
        lat: pickupLoc.lat(),
        lng: pickupLoc.lng(),
      };
      const dropoff = {
        lat: dropoffLoc.lat(),
        lng: dropoffLoc.lng(),
      };

      setPickupCoords(pickup);
      setDropoffCoords(dropoff);

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: dropoff,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        async (result, status) => {
          if (status === "OK") {
            setDirections(result);

            await axios.post(
              `${process.env.REACT_API}/api/rides`,
              {
                pickup,
                dropoff,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            alert("Ride requested!");
          } else {
            console.error("Directions error:", status);
          }
          setLoading(false);
        }
      );
    } catch (err) {
      console.error(err);
      alert("Failed to request ride");
      setLoading(false);
    }
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className="p-4 space-y-4">
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to Ride App</h1>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Enter pickup address"
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
          style={{ borderRadius: "5px", padding: "5px" }}
        />
        <br />
        <br />
        <input
          className="border p-2 w-full"
          placeholder="Enter drop-off address"
          value={dropoffAddress}
          onChange={(e) => setDropoffAddress(e.target.value)}
          style={{ borderRadius: "5px", padding: "5px" }}
        />

        <br />
        <br />
        <button
          onClick={handleRequestRide}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3 w-full"
          disabled={loading}
          style={{
            backgroundColor: "black",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          {loading ? "Requesting..." : "Request Ride"}
        </button>

        <br />
        <br />
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pickupCoords || { lat: 0, lng: 0 }}
        zoom={pickupCoords ? 12 : 2}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}
