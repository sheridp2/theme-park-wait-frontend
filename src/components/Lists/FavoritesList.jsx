import React, { useEffect, useState } from 'react'
import { API_PATHS } from "../../util/apiPaths";
import axiosInstance from '../../util/axiosInstance';
import RideFavoriteList from './RideFavoriteList';

const FIVE_MINUTES = 5 * 60 * 1000;

const FavoritesList = () => {
  const [favoritesData, setFavoritesData] = useState([]);
  const [waitTimes, setWaitTimes] = useState({});

  const fetchAllFavorites = async () => {
    const response = await axiosInstance.get(`${API_PATHS.FAVORITES.GET_ALL_FAVORITES}`);
    try {
      setFavoritesData(response.data);
    } catch (error) {
      console.log("Something went wrong. Try again", error);
    }
  };

  const fetchWaitTimes = async (parkId, waitTimesApiPath) => {
    try {
      const response = await axiosInstance.get(waitTimesApiPath);
      setWaitTimes(prev => ({ ...prev, [parkId]: response.data }));
    } catch (error) {
      console.log("Failed to fetch wait times", error);
    }
  };

  useEffect(() => {
    fetchAllFavorites();
  }, [])

    useEffect(() => {
    if (favoritesData.length === 0) return;

    console.log(favoritesData[0])

    const interval = setInterval(() => {
      favoritesData[0]?.parks.forEach(park => {
        // You need to know the API path for each park's wait times
        fetchWaitTimes(park._id, API_PATHS.WAITTIMES[park.park]);
      });
    }, FIVE_MINUTES);

    // // Initial fetch
    // favoritesData[0]?.parks.forEach(park => {
    //   fetchWaitTimes(park._id, API_PATHS.WAITTIMES[park.parkName]);
    // });

    return () => clearInterval(interval);
  }, [favoritesData]);

  return (
    <div>
      <h2>Your Favorites</h2>
      <div>
        {favoritesData[0]?.parks.map(park => (
          <RideFavoriteList key={park._id} park={park} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;
