import React from "react";
import { rideImages, rideMP4 } from "../../util/rideImages";
import { LuTrash } from "react-icons/lu";

const FavoriteRideCard = ({ ride, onDelete }) => {
  console.log(ride);
  
  return (
    <li className=" p-4 border border-gray-200 bg-white rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="shrink-0 hidden sm:block">
          {rideMP4.disneyworld[ride.rideName] ? (
            <video
              className="w-8 h-8 rounded-full"
              src={rideMP4.disneyworld[ride.rideName]}
              autoPlay
              loop
              muted
            />
          ) : (
            <img
              className="w-10 h-10 rounded-full"
              src={rideImages.disneyworld[ride.rideName]}
              alt={`Image of ${ride.rideName}`}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {ride.rideName}
          </p>
        </div>
        {ride.status == "Closed" && (
          <div className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <div>Closed</div>
          </div>
        )}
        {ride.status == "Refurbishment" && (
          <div className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <div>Refurbishment</div>
          </div>
        )}
        {ride.status == "Down" && (
          <div className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <div>Down</div>
          </div>
        )}
        {ride.status == "Operating" && (
        <div className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <div>{ride.waitTime} mins</div>
        </div>
        )}
          <div>
            <button
              className="text-gray-40 hover:text-red-500 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash size={18} />
            </button>
          </div>
      </div>
    </li>
  );
};

export default FavoriteRideCard;
