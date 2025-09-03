import React from "react";
import { rideImages, rideMP4 } from "../../util/rideImages";

const FavoriteRideCard = ({ ride }) => {
  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="shrink-0">
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
              className="w-8 h-8 rounded-full"
              src={rideImages.disneyworld[ride.rideName]}
              alt={`Image of ${ride.rideName}`}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {ride.rideName}
          </p>
          {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            email@flowbite.com
          </p> */}
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {ride.waitTime} mins
        </div>
      </div>
    </li>
  );
};

export default FavoriteRideCard;
