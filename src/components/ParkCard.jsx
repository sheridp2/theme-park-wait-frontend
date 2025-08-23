import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment"; // Add this import

const ParkCard = ({ park }) => {
  const [parkHours, setParkHours] = useState([]);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const parkUrl = park.name.replace(/\s+/g, '').toLowerCase();

  useEffect(() => {
    axios.get(`http://localhost:8000/${park.hoursUrl}`).then((res) => {
      setParkHours(res.data[0]);
      setOpeningTime(
        moment(res.data[0].openingTime).format("h:mm A")
      );
      setClosingTime(
        moment(res.data[0].closingTime).format("h:mm A")
      );
    });
  }, []);

  return (
    <div>
      <Link
        to={`/${parkUrl}`}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={park.image}
          alt={`Image of ${park.name}`}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {park.name}
          </h5>
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <p>
              Park Hours: {openingTime} - {closingTime}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ParkCard;
