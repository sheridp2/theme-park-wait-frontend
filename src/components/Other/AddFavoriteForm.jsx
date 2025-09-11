import React, { useState } from "react";

const AddFavoriteForm = ({ handleAddFavorite, allParksRides }) => {
  const [favoriteData, setFavoriteData] = useState({
    rideName: "",
    rideId: "",
  });

  const handleSubmit = () => {
    if (favoriteData.rideName === "") return;

    handleAddFavorite(favoriteData);
    
  };

  const handleChange = (e) => {
    if (e.target.value === "DEFAULT") return;
    const [rideId, rideName] = e.target.value.split("|");
    setFavoriteData({ ...favoriteData, rideId, rideName });
  };

  return (
    <div>
      <form>
        <select
          id="rides"
          defaultValue={"DEFAULT"}
          onChange={(e) => {
            handleChange(e);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4"
        >
          <option value="DEFAULT" disabled>
            Choose a ride
          </option>
          {allParksRides.map((ride) => (
            <option key={ride.id} value={`${ride.id}|${ride.name}`}>
              {ride.name}
            </option>
          ))}
        </select>
        <button type="button" className="main-button" onClick={handleSubmit}>
          Add Favorite
        </button>
      </form>
    </div>
  );
};

export default AddFavoriteForm;
