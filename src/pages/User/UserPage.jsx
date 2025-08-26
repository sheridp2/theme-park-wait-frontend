import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { FaRegCalendarPlus } from "react-icons/fa";
import Modal from "../../components/Other/Modal";
import AddTripForm from "../../components/Other/AddTripForm";
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS } from "../../util/apiPaths";
import toast from "react-hot-toast";
import TripList from "../../components/Other/TripList";

const UserPage = ({ user }) => {
  useUserAuth();

  const [openAddTripModal, setOpenAddTripModal] = useState(false);
  const [tripData, setTripData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
    category: null,
  });

  const fetchAllTrips = async () => {
    if (loading) return;
    const response = await axiosInstance.get(`${API_PATHS.TRIP.GET_ALL_TRIPS}`);
    try {
      setTripData(response.data);
    } catch (error) {
      console.log("Something went wrong. Try again", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrip = async (tripData) => {
    const { tripName, park, startDate, endDate } = tripData;
    try {
      await axiosInstance.post(API_PATHS.TRIP.ADD_TRIP, {
        tripName,
        park,
        startDate,
        endDate,
      });
      setOpenAddTripModal(false);
      toast.success("Trip added successfully");
      fetchAllTrips();
    } catch (error) {
      console.error(
        "Error adding trip:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchAllTrips();

    return () => {};
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap py-6 justify-between items-center">
        <div>
          <h2>Welcome back, {user?.fullName}!</h2>
          <p>Only 345 days till you trip to Disneyland!</p>
        </div>
      </div>
      <div>
        <button
          type="button"
          className=" flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => setOpenAddTripModal(true)}
        >
          <FaRegCalendarPlus />
          <h4 className="ml-2">Add trip</h4>
        </button>
      </div>
      <div>
        <TripList trips={tripData} />
      </div>
      <Modal
        isOpen={openAddTripModal}
        onClose={() => setOpenAddTripModal(false)}
        title="Add New Trip"
      >
        <AddTripForm handleAddTrip={handleAddTrip} />
      </Modal>
    </div>
  );
};

export default UserPage;
