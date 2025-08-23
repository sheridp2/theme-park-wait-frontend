import React from "react";
import { rideImages, rideMP4 } from "../util/rideImages";
import moment from "moment";

const RideInfoCard = ({ ride }) => {
  return (
    <div className="">
      <div className=" rounded overflow-hidden shadow-lg">
        <div className="relative">
          {/* Badge overlay */}
          {ride.meta?.type === "ATTRACTION" && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow">
              ATTRACTION
            </span>
          )}
          {ride.meta?.type === "RESTAURANT" && (
            <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded shadow">
              RESTAURANT
            </span>
          )}
          {/* Image or video */}
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
        </div>
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
              {ride.status !== "Closed" && (
                <p className="text-gray-700 text-base">
                  Wait time: {ride.waitTime} mins
                </p>
              )}
              {ride.meta?.returnTime?.state === "AVAILABLE" && (
                <p>
                  Return time:
                  <span className="text-green-500">
                    {" "}
                    {moment(ride.meta.returnTime.returnStart).format("h:mm A")}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
        <div className="px-6 pb-2">
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
              {ride.status.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideInfoCard;
