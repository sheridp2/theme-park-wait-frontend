import React from "react";
import FavoriteRideCard from "../Cards/FavoriteRideCard";

const RideFavoriteList = ({ park }) => {
  return (
    <div className="py-4">
      <div>{park.park.replaceAll("-", " ")}</div>
      <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {park.favorites.map((ride) => (
          <FavoriteRideCard key={ride._id} ride={ride} />
        ))}
      </ul>
    </div>
  );
};

export default RideFavoriteList;
