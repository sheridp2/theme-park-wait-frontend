import axios from "axios";
import React, { useEffect, useState } from "react";
import RideInfoCard from "./RideInfoCard";
import { PARKS_LIST } from "../util/data";;

const ParksList = ({ park }) => {
  const [parkData, setParkData] = useState([]);
  const [operatingRides, setOperatingRides] = useState([]);
  const [closedRides, setClosedRides] = useState([]);
  const [compactView, setCompactView] = useState(false);
  const [filters, setFilters] = useState({
    attractions: true,
    restaurants: true,
    // add more filters here
  });

  const toggleCompactView = () => {
    localStorage.setItem('compactView', JSON.stringify(!compactView));
    setCompactView(!compactView);
  };

  useEffect(() => {
    const closedRidesArray = [];
    const operatingRidesArray = [];
    const parkUrl = park.replace(/\s+/g, "").toLowerCase();

    const compactViewStorage = JSON.parse(localStorage.getItem('compactView'));
    setCompactView(compactViewStorage ?? false);

    axios
      .get(`http://localhost:8000/disneyworld-${parkUrl}-waittimes`)
      .then((res) => {
        const sortedRides = res.data.sort(
          (a, b) => (b.waitTime ?? 0) - (a.waitTime ?? 0)
        );
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
    <div className="container mx-auto">
      <div className="flex py-6 justify-between items-center">
        <div className="">
          <h2>{park}</h2>
        </div>
        <div className="inline-block align-middle">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={compactView}
              onChange={() => toggleCompactView()}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Compact View
            </span>
          </label>
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <ul className="items-center w-sm text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                checked={filters.attractions}
                onChange={(e) =>
                  setFilters({ ...filters, attractions: e.target.checked })
                }
                id="vue-checkbox-list"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="vue-checkbox-list"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ATTRACTIONS
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                checked={filters.restaurants}
                onChange={(e) =>
                  setFilters({ ...filters, restaurants: e.target.checked })
                }
                id="react-checkbox-list"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="react-checkbox-list"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                RESTAURANTS
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className="py-2">
          <h3>Open Rides</h3>
        </div>
        <div className={`grid ${compactView ? "grid-cols-1" : "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"} gap-4`}>
          {operatingRides
            .filter(
              (ride) =>
                (ride.meta?.type === "ATTRACTION" && filters.attractions) ||
                (ride.meta?.type === "RESTAURANT" && filters.restaurants)
            )
            .map((ride) => (
              <RideInfoCard key={ride.id} ride={ride} compactView={compactView} />
            ))}
        </div>
        <div className="py-2">
          <h3 className="mt-4">Closed Rides</h3>
        </div>
        <div className={`grid ${compactView ? "grid-cols-1" : "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"} gap-4`}>
          {closedRides
            .filter(
              (ride) =>
                (ride.meta?.type === "ATTRACTION" && filters.attractions) ||
                (ride.meta?.type === "RESTAURANT" && filters.restaurants)
            )
            .map((ride) => (
              <RideInfoCard key={ride.id} ride={ride} compactView={compactView} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParksList;
