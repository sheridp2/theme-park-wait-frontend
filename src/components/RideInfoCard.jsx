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
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                {" "}
                {ride.status}
              </button>
            </>
          ) : (
            <div>
              <p className="text-gray-700 text-base">
                Wait time: {ride.waitTime} mins
              </p>
              {ride.meta?.returnTime?.state === "AVAILABLE" &&
                <p>Return time:<span className="text-green-500"> {ride.meta.returnTime.returnStart}</span>
                </p>}
            </div>
          )}
        </div>
        <div className="px-6 pb-2">
          {ride.meta.type === "ATTRACTION" && (
            <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              ATTRACTION
            </span>
          )}
          {ride.meta.type === "RESTAURANT" && (
            <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              RESTAURANT
            </span>
          )}
          {ride.meta.singleRider && (
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              SINGLE RIDER
            </span>
          )}
          {ride.meta?.returnTime?.state === "AVAILABLE" && (
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              RETURN TIME!
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
