import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { FaRegCalendarPlus } from "react-icons/fa";
import Modal from "../../components/Other/Modal";
import AddTripForm from "../../components/Other/AddTripForm";
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS } from "../../util/apiPaths";
import toast from "react-hot-toast";

import DeleteAlert from "../../components/Other/DeleteAlert";
import TripList from "../../components/Lists/TripList";
import FavoritesList from "../../components/Lists/FavoritesList";

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
      // Sort trips by startDate ascending (soonest first)
      const sortedTrips = response.data.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
      setTripData(sortedTrips);
    } catch (error) {
      console.log("Something went wrong. Try again", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrip = async (tripData) => {
    const { tripName, park, startDate, endDate } = tripData;
    setLoading;
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
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.TRIP.DELETE_TRIP(id));
      setOpenDeleteAlert({ show: false, data: null });
      fetchAllTrips();
    } catch (error) {
      console.error(
        "Error deleting trip: ",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchAllTrips();

    return () => {};
  }, []);

  const daysTillTrip = (tripDate) => {
    const today = new Date();
    const trip = new Date(tripDate);
    const diffTime = trip - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="container mx-auto">
      <div>
        <div className="flex flex-wrap py-6 justify-between items-center">
          <div>
            <h2>Welcome back, {user?.fullName}!</h2>
            {tripData.length > 0 && (
              <p>
                Only {daysTillTrip(tripData[0]?.startDate)} days till you trip
                to {tripData[0]?.park}!
              </p>
            )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <TripList
            trips={tripData}
            onDelete={(id, tripName) => {
              setOpenDeleteAlert({ show: true, data: id, tripName: tripName });
            }}
          />
        </div>
        <Modal
          isOpen={openAddTripModal}
          onClose={() => setOpenAddTripModal(false)}
          title="Add New Trip"
        >
          <AddTripForm handleAddTrip={handleAddTrip} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null, tripName: null })
          }
          title="Delete Trip"
        >
          <DeleteAlert
            content={`Are you sure you want to delete "${openDeleteAlert.tripName}" from upcoming trips?`}
            onDelete={() => deleteTrip(openDeleteAlert.data)}
          />
        </Modal>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="">
          <FavoritesList />
      </div>
    </div>
  );
};

export default UserPage;
