import axios from "axios";
import React, { useEffect, useState } from "react";
import RideInfoCard from "./RideInfoCard";
import { PARKS_LIST } from "../util/data";

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
        const sortedRides = res.data.sort((a, b) => (b.waitTime ?? 0) - (a.waitTime ?? 0));
        sortedRides.forEach((ride) => {
          if (
            PARKS_LIST.find((p) => p.name === park)?.ignored.includes(ride.name)
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
      <div className="py-6">
        <h2>{park}</h2>

      </div>
      <div className="container mx-auto">
        <div className="py-2">
          <h3>Open Rides</h3>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {operatingRides?.map((ride) => {
            return (
            <RideInfoCard key={ride.id} ride={ride}/>
            )
          })}
        </div>
        <div className="py-2">
          <h3>Closed Rides</h3>
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
