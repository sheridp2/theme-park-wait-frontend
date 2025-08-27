import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import RideInfoCard from "./RideInfoCard";
import { DISNEY_WORLD_PARKS_LIST, DISNEYLAND_PARKS_LIST } from "../util/data";
import moment from "moment";
const ParksList = ({ park }) => {
  const [operatingRides, setOperatingRides] = useState([]);
  const [closedRides, setClosedRides] = useState([]);
  const [compactView, setCompactView] = useState(false);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [filters, setFilters] = useState({
    attractions: true,
    restaurants: true,
    store: true,
    // add more filters here
  });

  const toggleCompactView = useCallback(() => {
    localStorage.setItem("compactView", JSON.stringify(!compactView));
    setCompactView((prev) => !prev);
  }, [compactView]);

  useEffect(() => {
    const closedRidesArray = [];
    const operatingRidesArray = [];
    const parkUrl = park.replace(/\s+/g, "").toLowerCase();

    const compactViewStorage = JSON.parse(localStorage.getItem("compactView"));
    if (compactViewStorage) {
      setCompactView(compactViewStorage);
    }

    axios.get(`http://localhost:8000/waittimes/${parkUrl}-waittimes`).then((res) => {
      const sortedRides = res.data.sort(
        (a, b) => (b.waitTime ?? 0) - (a.waitTime ?? 0)
      );
      sortedRides.forEach((ride) => {
        console.log(ride.id)
        if (
          DISNEY_WORLD_PARKS_LIST.find((p) => p.name === park)?.ignored.includes(ride.name) ||
          DISNEYLAND_PARKS_LIST.find((p) => p.name === park)?.ignored.includes(ride.name) ||
          DISNEYLAND_PARKS_LIST.find((p) => p.name === park)?.ignored.includes(ride.id)
        ) {
          return;
        } // Skip this ride
        if (
          DISNEY_WORLD_PARKS_LIST.find((p) => p.name === park)?.stores.includes(ride.name) ||
          DISNEYLAND_PARKS_LIST.find((p) => p.name === park)?.stores.includes(ride.name)
        ) {
          ride.meta.type = "STORE";
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
    });

    axios.get(`http://localhost:8000/waittimes/${parkUrl}-parkhours`).then((res) => {
      setOpeningTime(moment(res.data[0].openingTime).format("h:mm A"));
      setClosingTime(moment(res.data[0].closingTime).format("h:mm A"));
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap py-6 justify-between items-center">
        <div>
          <h2>{park}</h2>
          <p>
            Park Hours: {openingTime} - {closingTime}
          </p>
        </div>
  
        <div className="inline-block align-middle sm:pt-0 pt-4">
          <label className="inline-flex items-center cursor-pointer 2">
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
        <ul className="items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                checked={filters.attractions}
                onChange={(e) =>
                  setFilters({ ...filters, attractions: e.target.checked })
                }
                id="attractions-checkbox-list"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="attractions-checkbox-list"
                className="min-w-[120px] py-3 mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                id="restaurants-checkbox-list"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="restaurants-checkbox-list"
                className="min-w-[120px] py-3 mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                RESTAURANTS
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 min-w">
            <div className="flex items-center ps-3 min-w">
              <input
                checked={filters.store}
                onChange={(e) =>
                  setFilters({ ...filters, store: e.target.checked })
                }
                id="store-checkbox-list"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="store-checkbox-list"
                className="min-w-[120px] py-3 mx-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                STORE
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className="py-2">
          <h3>Open Rides</h3>
        </div>
        <div
          className={`grid ${
            compactView
              ? "grid-cols-1"
              : "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
          } gap-4`}
        >
          {operatingRides
            .filter(
              (ride) =>
                (ride.meta?.type === "ATTRACTION" && filters.attractions) ||
                (ride.meta?.type === "RESTAURANT" && filters.restaurants) ||
                (ride.meta?.type === "STORE" && filters.store)
            )
            .map((ride) => (
              <RideInfoCard
                key={ride.id}
                ride={ride}
                compactView={compactView}
              />
            ))}
        </div>
        <div className="py-2">
          <h3 className="mt-4">Closed Rides</h3>
        </div>
        <div
          className={`grid ${
            compactView
              ? "grid-cols-1"
              : "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
          } gap-4`}
        >
          {closedRides
            .filter(
              (ride) =>
                (ride.meta?.type === "ATTRACTION" && filters.attractions) ||
                (ride.meta?.type === "RESTAURANT" && filters.restaurants)||
                (ride.meta?.type === "STORE" && filters.store)
            )
            .map((ride) => (
              <RideInfoCard
                key={ride.id}
                ride={ride}
                compactView={compactView}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParksList;
