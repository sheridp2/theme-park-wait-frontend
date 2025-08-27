import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment"; // Add this import
import { BASE_URL } from "../util/apiPaths";
import tz from "moment-timezone";

const ParkCard = ({ park }) => {
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [specialEvent, setSpecialEvent] = useState({
    openingTime: "",
    closingTime: "",
    type: null,
  });
  const [earlyEntry, setEarlyEntry] = useState({
    openingTime: "",
    closingTime: "",
    type: null,
  });

  const parkUrl = park.name.replace(/\s+/g, "").toLowerCase();

  const setLocalStorageData = (parkName, type, data, expirationTime) => {
    localStorage.setItem(
      `park.${parkName}.${type}`,
      JSON.stringify({
        ...data,
        expiresAt: Date.now() + expirationTime,
      })
    );
  };

  const getParkHours = () => {
    axios.get(`${BASE_URL}/waittimes/${park.hoursUrl}`).then((res) => {
      const formattedOpening = moment(res.data[0].openingTime).tz(park.timezone).format("h:mm A z");
      const formattedClosing = moment(res.data[0].closingTime).tz(park.timezone).format("h:mm A z");
      setOpeningTime(formattedOpening);
      setClosingTime(formattedClosing);
      setLocalStorageData(
        parkUrl,
        "hours",
        {
          openingTime: formattedOpening,
          closingTime: formattedClosing,
        },
        4 * 60 * 60 * 1000
      ); // expires in 4 hours

      const specialEventObj = res.data[0]?.special?.find(
        (event) => event.description === "Special Ticketed Event"
      );
      const earlyEntryObj = res.data[0]?.special?.find(
        (event) => event.description === "Early Entry"
      );
      if (specialEventObj) {
        const newSpecialEvent = {
          openingTime: moment(specialEventObj.openingTime).tz(park.timezone).format("h:mm A z"),
          closingTime: moment(specialEventObj.closingTime).tz(park.timezone).format("h:mm A z"),
          type: specialEventObj.description,
        };
        setSpecialEvent(newSpecialEvent);
        setLocalStorageData(
          parkUrl,
          "specialEvent",
          newSpecialEvent,
          6 * 60 * 60 * 1000
        );
      }

      if (earlyEntryObj) {
        const newEarlyEntry = {
          openingTime: moment(earlyEntryObj.openingTime).tz(park.timezone).format("h:mm A z"),
          closingTime: moment(earlyEntryObj.closingTime).tz(park.timezone).format("h:mm A z"),
          type: earlyEntryObj.description,
        };
        setEarlyEntry(newEarlyEntry);
        setLocalStorageData(
          parkUrl,
          "earlyEntry",
          newEarlyEntry,
          6 * 60 * 60 * 1000
        );
      }
    });
  };

  useEffect(() => {
    const localStorageDataHours = localStorage.getItem(`park.${parkUrl}.hours`);
    const localStorageDataSpecialEvent = localStorage.getItem(
      `park.${parkUrl}.specialEvent`
    );
    const localStorageDataEarlyEntry = localStorage.getItem(
      `park.${parkUrl}.earlyEntry`
    );

    if (localStorageDataHours) {
      const { openingTime, closingTime, expiresAt } = JSON.parse(
        localStorageDataHours
      );
      if (expiresAt && Date.now() < expiresAt) {
        setOpeningTime(openingTime);
        setClosingTime(closingTime);
      } else {
        localStorage.removeItem(`park.${parkUrl}.hours`);
      }
    } else {
      getParkHours();
    }
    if (localStorageDataSpecialEvent) {
      const { openingTime, closingTime, type, expiresAt } = JSON.parse(
        localStorageDataSpecialEvent
      );
      if (expiresAt && Date.now() < expiresAt) {
        setSpecialEvent({ openingTime, closingTime, type });
      }
    }
    if (localStorageDataEarlyEntry) {
      const { openingTime, closingTime, type, expiresAt } = JSON.parse(
        localStorageDataEarlyEntry
      );
      if (expiresAt && Date.now() < expiresAt) {
        setEarlyEntry({ openingTime, closingTime, type });
      }
    }
  }, []);

  return (
    <div className="rounded overflow-hidden shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Link
        to={`/${parkUrl}`}
        parkopening={openingTime}
        parkclosing={closingTime}
        className="flex flex-col xs:items-center rounded-lg md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 card-img"
      >
        <img
          className="object-cover w-full rounded-t-lg h-26 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg card-img"
          src={park.image}
          alt={`Image of ${park.name}`}
        />
        <div className="flex flex-col p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {park.name}
          </h5>
          <div className="mb-3 font-normal dark:text-white">
            <p>
              Park Hours: {openingTime} - {closingTime}
            </p>
          </div>
          {earlyEntry.type && (
            <div className="mb-3 font-normal dark:text-white">
              <p>
                {earlyEntry.type}: {earlyEntry.openingTime} -{" "}
                {earlyEntry.closingTime}
              </p>
            </div>
          )}
          {specialEvent.type && (
            <div className="mb-3 font-normal dark:text-white">
              <p>
                {specialEvent.type}: {specialEvent.openingTime} -{" "}
                {specialEvent.closingTime}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ParkCard;
