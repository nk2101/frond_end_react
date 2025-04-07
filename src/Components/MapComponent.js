/* global google */
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export default function MapComponent({ pickup, dropoff }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:   "AIzaSyBoUIrQCGUbFsvBsSByRJ-kPHGLtRDNC3c",
  });

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (pickup && dropoff && isLoaded) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: dropoff,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') setDirections(result);
        }
      );
    }
  }, [pickup, dropoff, isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={pickup || { lat: 0, lng: 0 }} zoom={12}>
      {pickup && <Marker position={pickup} />}
      {dropoff && <Marker position={dropoff} />}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}
