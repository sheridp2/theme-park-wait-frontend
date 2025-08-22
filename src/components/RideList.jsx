import axios from "axios";
import React, { useEffect, useState } from "react";
import RideInfoCard from "./RideInfoCard";

const ParksList = ({ park }) => {
  const [parkData, setParkData] = useState([]);
  const [operatingRides, setOperatingRides] = useState([]);
  const [closedRides, setClosedRides] = useState([]);

  useEffect(() => {
    const closedRidesArray = [];
    const operatingRidesArray = [];
    const parkUrl = park.replace(/\s+/g, '').toLowerCase();
    
    axios
      .get(`http://localhost:8000/disneyworld-${parkUrl}-waittimes`)
      .then((res) => {
        res.data.forEach((ride) => {
          if (
            ride.name === "Trick-or-Treat Locations at Mickey's Not-So-Scary Halloween Party" ||
            ride.name === "Casey Jr. Splash 'N' Soak Station" ||
            ride.name === "Allergy-Friendly Trick-or-Treat Experience at Mickey's Not-So-Scary Halloween Party"
          ) {
            return; // Skip this ride
          }
          if (ride.waitTime === null) {
            ride.waitTime = 0;
          }
          if (ride.status === "Refurbishment" || ride.status === "Closed") {
            closedRidesArray.push(ride);
          } else {
            operatingRidesArray.push(ride);
          }
        });
        setOperatingRides(operatingRidesArray);
        setClosedRides(closedRidesArray);
        setParkData(res.data);
      });
  }, []);

  return (

    <div>
      <p>Disney's Magic Kingdom</p>
      <div className="container mx-auto">
        
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {operatingRides?.map((ride) => {
            return (
            <RideInfoCard key={ride.id} ride={ride}/>
            )
          })}
        </div>
        <div className="py-6">
          <h2>Closed Rides</h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {closedRides?.map((ride) => {
            return (
              <RideInfoCard key={ride.id} ride={ride} />
            )
          })}
        </div>

      </div>
    </div>
  );
};

export default ParksList;
