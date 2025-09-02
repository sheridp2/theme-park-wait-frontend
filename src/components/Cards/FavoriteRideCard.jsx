import React from "react";
import { rideImages, rideMP4 } from "../../util/rideImages";

const FavoriteRideCard = ({ ride }) => {
  return (
    <li class="pb-3 sm:pb-4">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="shrink-0">
          {rideMP4.disneyworld[ride.rideName] ? (
            <video
              class="w-8 h-8 rounded-full"
              src={rideMP4.disneyworld[ride.rideName]}
              autoPlay
              loop
              muted
            />
          ) : (
            <img
              class="w-8 h-8 rounded-full"
              src={rideImages.disneyworld[ride.rideName]}
              alt={`Image of ${ride.rideName}`}
            />
          )}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {ride.rideName}
          </p>
          {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            email@flowbite.com
          </p> */}
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          20 mins
        </div>
      </div>
    </li>
  );
};

export default FavoriteRideCard;
