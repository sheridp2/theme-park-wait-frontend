import React from "react";
import FavoriteRideCard from "../Cards/FavoriteRideCard";

const RideFavoriteList = ({ park }) => {
  return (
    <div className="py-4">
      <div>{park.park.replaceAll("-", " ")}</div>
      <div>
        {park.favorites.map((ride) => (
          <FavoriteRideCard key={ride._id} ride={ride} />
        ))}
      </div>
    </div>
  );
};

export default RideFavoriteList;
