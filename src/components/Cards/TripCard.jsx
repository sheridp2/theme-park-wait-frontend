import React from "react";
import { LuTrash } from "react-icons/lu";
import moment from "moment";

const TripCard = ({ trip, onDelete }) => {
  const { park, tripName, startDate, endDate } = trip;
  return (
    <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between gap-2">
        <div>
          <h3 className="dark:text-white">{tripName}</h3>
          <h4 className="dark:text-gray-300">{park}</h4>
        </div>
        <div>
          <button
            className="text-gray-40 hover:text-red-500 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={onDelete}
          >
            <LuTrash size={18} />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <ol className="items-center sm:flex">
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-300 shrink-0">
                <svg
                  className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:text-gray-300"></div>
            </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                First day at {park}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-300">
                {startDate ? moment.utc(startDate).format("MMM D, YYYY") : ""}
              </time>
            </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-300 shrink-0">
                <svg
                  className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Trip end date
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-300">
                {endDate ? moment.utc(endDate).format("MMM D, YYYY") : ""}
              </time>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TripCard;
