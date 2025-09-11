import React, { useEffect, useState } from "react";
import FavoriteRideCard from "../Cards/FavoriteRideCard";
import { API_PATHS } from "../../util/apiPaths";
import axiosInstance from "../../util/axiosInstance";
import { FaPlus } from "react-icons/fa";
import Modal from "../Other/Modal";
import AddFavoriteForm from "../Other/AddFavoriteForm";
import toast from "react-hot-toast";

const RideFavoriteList = ({ park, fetchAllFavorites }) => {
  const [favoritesWithWait, setFavoritesWithWait] = useState(park.favorites);
  const [openFavoriteModal, setOpenAddFavoriteModal] = useState(false);
  const [allParksRides, setAllParksRides] = useState([]);

  const parkUrl = park.park
    .replace(/\s+/g, "")
    .split("-")
    .join("")
    .toLowerCase();

  const getParkWaittimes = async () => {
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.WAITTIMES.GET_PARK_WAIT_TIME(parkUrl)}`
      );
      setAllParksRides(res.data);
      const updatedFavorites = favoritesWithWait.map((ride) => {
        const rideData = res.data.find(
          (resRide) => resRide.name === ride.rideName
        );
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

  const handleAddFavorite = async (favoriteDataToAdd) => {
    try {
      await axiosInstance.post(API_PATHS.FAVORITES.ADD_FAVORITE(park.park), {
        rideName: favoriteDataToAdd.rideName,
        rideId: favoriteDataToAdd.rideId
      });
      setOpenAddFavoriteModal(false);
      toast.success("Ride added successfully");
      fetchAllFavorites();
    } catch (error) {
      console.log("Error adding favorite", error);
    }
  };

  useEffect(() => {
    getParkWaittimes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-4 max-w-md">
      <div className="flex gap-2 py-2 justify-between items-center">
        <h4>{park.park.replaceAll("-", " ")}</h4>
      </div>
      <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {favoritesWithWait.map((ride) => (
          <FavoriteRideCard key={ride._id} ride={ride} />
        ))}
      </ul>
      <button
        type="button"
        className="w-full mt-4 flex justify-center items-center text-center main-button"
        onClick={() => setOpenAddFavoriteModal(true)}
      >
        <FaPlus /><span className="pl-1.5">Add Favorite</span>
      </button>

      <Modal
        isOpen={openFavoriteModal}
        onClose={() => setOpenAddFavoriteModal(false)}
        title={`Add Favorite ${park.park.replaceAll("-", " ")} Ride`}
      >
        <AddFavoriteForm handleAddFavorite={handleAddFavorite} allParksRides={allParksRides} />
      </Modal>
    </div>
  );
};

export default RideFavoriteList;
