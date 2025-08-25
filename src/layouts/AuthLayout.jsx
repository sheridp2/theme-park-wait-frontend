import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function AuthLayout({ children }) {
  return (
    <>
      <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <div className="flex flex-1 items-center justify-between">
          <h2 className="sm:text-3xl text-xl font-medium text-black">
            Theme Park Wait Times
          </h2>
        </div>
      </div>
      <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
          <Link to={"/"}>
            <button
              type="button"
              className=" flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <FaArrowLeft />
              <h4 className="ml-2">Home</h4>
            </button>
          </Link>
          {children}
        </div>
      </div>
    </>
  );
}
