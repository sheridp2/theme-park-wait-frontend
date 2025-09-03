import React, { useEffect, useState } from "react";
import { API_PATHS } from "../../util/apiPaths";
import axiosInstance from "../../util/axiosInstance";
import RideFavoriteList from "./RideFavoriteList";

const FavoritesList = () => {
  const [favoritesData, setFavoritesData] = useState([]);

  const fetchAllFavorites = async () => {
    const response = await axiosInstance.get(
      `${API_PATHS.FAVORITES.GET_ALL_FAVORITES}`
    );
    try {
      setFavoritesData(response.data);
    } catch (error) {
      console.log("Something went wrong. Try again", error);
    }
  };

  useEffect(() => {
    fetchAllFavorites();
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>

      {/* TODO: Add add favorites button */}
      <div>
        {favoritesData[0]?.parks.map((park) => (
          <RideFavoriteList key={park._id} park={park} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
