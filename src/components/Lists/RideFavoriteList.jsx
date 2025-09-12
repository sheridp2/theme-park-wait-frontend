import React, { useEffect, useState } from "react";
import FavoriteRideCard from "../Cards/FavoriteRideCard";
import { API_PATHS } from "../../util/apiPaths";
import axiosInstance from "../../util/axiosInstance";
import { FaPlus } from "react-icons/fa";
import Modal from "../Other/Modal";
import AddFavoriteForm from "../Other/AddFavoriteForm";
import toast from "react-hot-toast";

const RideFavoriteList = ({ park, fetchAllFavorites }) => {
  const [favoritesWithWait, setFavoritesWithWait] = useState([]);
  const [openFavoriteModal, setOpenAddFavoriteModal] = useState(false);
  const [allParksRides, setAllParksRides] = useState([]);

  const parkUrl = park.park
    .replace(/\s+/g, "")
    .split("-")
    .join("")
    .toLowerCase();

  const getParkWaittimes = async () => {
    const cacheKey = `waittimes_${parkUrl}`;
    const cache = localStorage.getItem(cacheKey);
    const now = Date.now();
    let data;
    if (cache) {
      const { timestamp, waittimes } = JSON.parse(cache);
      if (now - timestamp < 5 * 60 * 1000) {
        // Use cached data
        data = waittimes;
      }
    }
    if (!data) {
      try {
        const res = await axiosInstance.get(
          `${API_PATHS.WAITTIMES.GET_PARK_WAIT_TIME(parkUrl)}`
        );
        data = res.data;
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: now, waittimes: data })
        );
      } catch (error) {
        console.log("Error fetching wait times", error);
        return;
      }
    }
    setAllParksRides(data);
    // Always use the latest park.favorites, not local state
    const updatedFavorites = (park.favorites || []).map((ride) => {
      const rideData = data.find((resRide) => resRide.name === ride.rideName);
      return {
        ...ride,
        waitTime: rideData && rideData.waitTime ? rideData.waitTime : "0",
        status: rideData ? rideData.status : "Closed",
      };
    });
    setFavoritesWithWait(updatedFavorites);
  };

  const handleAddFavorite = async (favoriteDataToAdd) => {
    try {
      await axiosInstance.post(API_PATHS.FAVORITES.ADD_FAVORITE(park.park), {
        rideName: favoriteDataToAdd.rideName,
        rideId: favoriteDataToAdd.rideId,
      });
      setOpenAddFavoriteModal(false);
      toast.success("Ride added successfully");
      fetchAllFavorites();
    } catch (error) {
      console.log("Error adding favorite", error);
    }
  };

  const handleDeleteFavorite = async (rideId) => {
    try {
      await axiosInstance.delete(
        API_PATHS.FAVORITES.DELETE_FAVORITE(park.park, rideId)
      );
      toast.success("Ride deleted successfully");
      fetchAllFavorites();
    } catch (error) {
      console.log("Error deleting favorite", error);
    }
  };

  useEffect(() => {
    getParkWaittimes();
  }, [park]);

  return (
    <div className="py-2">
      <div className="flex gap-2 py-2 justify-between items-center">
        <h4>{park.park.replaceAll("-", " ")}</h4>
      </div>
      <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {favoritesWithWait.map((ride) => (
          <FavoriteRideCard
            key={ride._id}
            ride={ride}
            onDelete={() => handleDeleteFavorite(ride._id)}
          />
        ))}
      </ul>
      {favoritesWithWait.length <= 4 && (
        <button
          type="button"
          className="w-full mt-4 flex justify-center items-center text-center main-button"
          onClick={() => setOpenAddFavoriteModal(true)}
        >
          <FaPlus />
          <span className="pl-1.5">Add Favorite</span>
        </button>
      )}

      <Modal
        isOpen={openFavoriteModal}
        onClose={() => setOpenAddFavoriteModal(false)}
        title={`Add Favorite ${park.park.replaceAll("-", " ")} Ride`}
      >
        <AddFavoriteForm
          handleAddFavorite={handleAddFavorite}
          allParksRides={allParksRides}
        />
      </Modal>
    </div>
  );
};

export default RideFavoriteList;
