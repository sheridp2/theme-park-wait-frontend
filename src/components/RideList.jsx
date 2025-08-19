import axios from "axios";
import React, { useEffect, useState } from "react";
import RideInfoCard from "./RideInfoCard";

const ParksList = () => {
  const [parkData, setParkData] = useState([]);
  const [operatingRides, setOperatingRides] = useState([]);
  const [closedRides, setClosedRides] = useState([]);
  const [parkHours, setParkHours] = useState([]);
  const [openingTime, setOpeningTime] = useState([]);
  const [closingTime, setClosingTime] = useState([]);

  useEffect(() => {
    const closedRidesArray = [];
    const operatingRidesArray = [];
    axios
      .get("http://localhost:8000/disneyworld-magickingdom-waittimes")
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
    axios
      .get("http://localhost:8000/disneyworld-magickingdom-parkhours")
      .then((res) => {
        setParkHours(res.data[0]);
        setOpeningTime(res.data[0].openingTime.split("T")[1].split("-")[0]);
        setClosingTime(res.data[0].closingTime.split("T")[1].split("-")[0]);
      });
  }, []);

  return (

    <div >
      <p>Disney's Magic Kingdom</p>
      <p>Park Hours: {openingTime} - {closingTime}</p>
      <div className="container mx-auto">
        <p>Open Rides</p>
        <div className="flex flex-wrap">
          {operatingRides?.map((ride) => {
            return (
            <RideInfoCard key={ride.id} name={ride.name} waitTime={ride.waitTime} />
            )
          })}
        </div>
          <p>Closed Rides</p>
        <div className="flex flex-wrap ">
          {closedRides?.map((ride) => {
            return (
              <RideInfoCard key={ride.id} name={ride.name} waitTime={ride.waitTime} />
            )
          })}
        </div>

      </div>
    </div>
  );
};

export default ParksList;
