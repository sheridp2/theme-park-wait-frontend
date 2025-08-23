import React from "react";
import { rideImages, rideMP4 } from "../util/rideImages";
import moment from "moment";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

const RideInfoCard = ({ ride, compactView, park }) => {
  return (
    <div className="">
      {!compactView ? (
        <div className="rounded overflow-hidden shadow-lg">
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
            {/* Image or video */}
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
            <div className="font-bold text-base  mb-1 sm:mb-2">{ride.name}</div>
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
              <div className="flex flex-wrap">
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
    </div>
  );
};

export default RideInfoCard;
