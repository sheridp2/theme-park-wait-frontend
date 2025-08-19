import React from "react";
import { rideImages, rideMP4 } from "../util/rideImages";

const RideInfoCard = ({ name, waitTime }) => {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {rideMP4[name] ? (
          <video className="w-full" src={rideMP4[name]} autoPlay loop muted />
        ) : (
          <img
            className="w-full"
            src={rideImages[name]}
            // alt="Sunset in the mountains"
          />
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">
            Wait time: {waitTime} mins
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </div>
  );
};

export default RideInfoCard;
