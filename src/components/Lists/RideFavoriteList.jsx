import React, { useEffect, useState } from "react";
import FavoriteRideCard from "../Cards/FavoriteRideCard";
import { API_PATHS } from "../../util/apiPaths";
import axiosInstance from "../../util/axiosInstance";

const RideFavoriteList = ({ park }) => {
  const [favoritesWithWait, setFavoritesWithWait] = useState(park.favorites);

  const parkUrl = park.park
    .replace(/\s+/g, "")
    .split("-")
    .join("")
    .toLowerCase();

  const getParkWaittimes = async () => {
    try {
      const res = await axiosInstance.get(`${API_PATHS.WAITTIMES.GET_PARK_WAIT_TIME(parkUrl)}`);
      const updatedFavorites = favoritesWithWait.map((ride) => {
        const rideData = res.data.find((resRide) => resRide.name === ride.rideName);
        return {
          ...ride,
          waitTime: rideData ? rideData.waitTime : "N/A",
        };
      });
      setFavoritesWithWait(updatedFavorites);
    } catch (error) {
      console.log("Error fetching wait times", error);
    }
  };

  useEffect(() => {
    getParkWaittimes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-4">
      <div>{park.park.replaceAll("-", " ")}</div>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {favoritesWithWait.map((ride) => (
          <FavoriteRideCard key={ride._id} ride={ride} />
        ))}
      </ul>
    </div>
  );
};

export default RideFavoriteList;
