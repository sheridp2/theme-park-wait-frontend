import React from "react";
import { rideImages, rideMP4 } from "../util/rideImages";

const RideInfoCard = ({ ride }) => {
  return (
    <div className="">
      <div className=" rounded overflow-hidden shadow-lg">
        {rideMP4[ride.name] ? (
          <video
            className="w-full"
            src={rideMP4[ride.name]}
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            className="w-full"
            src={rideImages[ride.name]}
            alt={`Image of ${ride.name}`}
          />
        )}
        <div className="px-6 py-6">
          <div className="font-bold text-xl mb-2">{ride.name}</div>
          {ride.status === "Down" ? (
            <>
              <button  type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"> {ride.status}</button>
            </>

            
          ) : (
            <p className="text-gray-700 text-base">
              Wait time: {ride.waitTime} mins
            </p>
          )}
        </div>
        <div className="px-6 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {ride.meta.type || "Unknown"}
          </span>
          {ride.meta.singleRider && (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Single Rider
            </span>
          )}
          {ride.status !== "Operating" && ride.status !== "Down" && (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {ride.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideInfoCard;
