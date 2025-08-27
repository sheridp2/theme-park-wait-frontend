import React from "react";
import { rideImages, rideMP4 } from "../util/rideImages";
import moment from "moment";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

const RideInfoCard = ({ ride, compactView }) => {
  return (
    <>
      {!compactView ? (
        <div className="rounded overflow-hidden shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="relative">
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
            {ride.meta?.type === "STORE" && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded shadow">
                STORE
              </span>
            )}
            
            {rideMP4.disneyworld[ride.name] ? (
              <video
                className="w-full h-32 sm:h-48 object-cover"
                src={rideMP4.disneyworld[ride.name]}
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                className="w-full h-32 sm:h-48 object-cover"
                src={rideImages.disneyworld[ride.name]}
                alt={`Image of ${ride.name}`}
              />
            )}
          </div>
          <div className="px-3 py-3 sm:px-6 sm:py-6">
            <div className="font-bold text-base  mb-1 sm:mb-2 dark:text-white">{ride.name}</div>
            {ride.status === "Down" ? (
              <div
                className="flex items-center p-4 mt-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  Ride status: <span className="font-medium">{ride.status}</span>
                </div>
              </div>
            ) : (
              <div>
                {ride.status !== "Closed" && (
                  <p className="text-gray-700 text-base dark:text-white">
                    Wait time: {ride.waitTime} mins
                  </p>
                )}
                {ride.meta?.returnTime?.state === "AVAILABLE" && (
                  <p className="dark:text-white">
                    Return time:
                    <span className="text-green-500">
                      {" "}
                      {moment(ride.meta.returnTime.returnStart).format(
                        "h:mm A"
                      )}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="px-3 pb-1 sm:px-6 sm:pb-2">
            {ride.meta.singleRider && (
              <span className="inline-flex items-center bg-blue-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                <MdAirlineSeatReclineNormal className="mr-1" />
                SINGLE RIDER
              </span>
            )}
            {ride.meta?.returnTime?.state === "AVAILABLE" && (
              <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                RETURN TIME!
              </span>
            )}
            {ride.status !== "Operating" && ride.status !== "Down" && (
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                {ride.status.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          {rideMP4.disneyworld[ride.name] ? (
            <video
              className="object-cover rounded-t-lg h-auto sm:w-48 w-28 rounded-none rounded-s-lg"
              src={rideMP4.disneyworld[ride.name]}
              autoPlay
              loop
              muted
            />
          ) : (
            <img
              className="object-cover rounded-t-lg h-auto sm:w-48 w-28 rounded-none rounded-s-lg"
              src={rideImages.disneyworld[ride.name]}
              alt={`Image of ${ride.name}`}
            />
          )}
          <div className="flex flex-1 flex-row justify-between items-center p-2 leading-normal">
            <div>
              <h5 className="font-bold sm:text-2xl pb-2 text-sm tracking-tight text-gray-900 dark:text-white">
                {ride.name}
              </h5>
              <div className="flex flex-wrap gap-0.5">
                <div>
                  {ride.meta?.type === "ATTRACTION" && (
                    <span className=" bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow">
                      ATTRACTION
                    </span>
                  )}
                </div>
                <div>
                  {ride.meta?.type === "RESTAURANT" && (
                    <span className=" bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded shadow">
                      RESTAURANT
                    </span>
                  )}
                </div>
                <div>
                  {ride.meta.singleRider && (
                    <span className="inline-flex items-center bg-blue-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                      <MdAirlineSeatReclineNormal className="mr-1" />
                      SINGLE RIDER
                    </span>
                  )}
                </div>
                <div>
                  {ride.meta?.returnTime?.state === "AVAILABLE" && (
                    <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                      RETURN TIME!
                    </span>
                  )}
                </div>
                <div>
                  {ride.status !== "Operating" && ride.status !== "Down" && (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                      {ride.status.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              {ride.status !== "Closed" && (
                <div className="font-bold text-white bg-blue-600 px-3 py-1 rounded-full shadow text-md w-max">
                  {ride.waitTime} mins
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RideInfoCard;
