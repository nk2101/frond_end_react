import { useEffect, useState } from 'react';
import MapComponent from './MapComponent'; 

export default function DriverDashboard() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setRides([
        {
          _id: 'ride123',
          status: 'Pending',
          pickup: { lat: 37.7749, lng: -122.4194 }, 
          dropoff: { lat: 37.3382, lng: -121.8863 }, 
        },
        {
          _id: 'ride456',
          status: 'Pending',
          pickup: { lat: 34.0522, lng: -118.2437 },   
          dropoff: { lat: 33.7701, lng: -118.1937 },
        },
      ]);
    }, 1000);
  }, []);

  const acceptRide = (id) => {
    alert(`Mock accept ride: ${id}`);
    setRides(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="p-4">
      
      <h2 className="text-xl mb-4">Available Rides for Aravindh</h2>
      {rides.length > 0 ? rides.map((ride) => (
        <div key={ride._id} className="mb-6 p-4 border rounded">
          <p><strong>Status:</strong> {ride.status}</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
            onClick={() => acceptRide(ride._id)}
            
          style={{
            backgroundColor: "black",
            borderRadius: "5px",
            padding: "10px",
          }}
          >
            Accept Ride
          </button>
          <br/> 
          <br/>
          <MapComponent pickup={ride.pickup} dropoff={ride.dropoff} />
        </div>
      )) : <p>No available rides.</p>}
    </div>
  );
}
