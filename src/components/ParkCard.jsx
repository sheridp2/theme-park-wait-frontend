import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment"; // Add this import

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

  const parkUrl = park.name.replace(/\s+/g, '').toLowerCase();

  useEffect(() => {
    const data = localStorage.getItem(`park.${parkUrl}.hours`);

    
    if (data) {
      const { openingTime, closingTime, expiresAt, specialEvent, earlyEntry } = JSON.parse(data);
      if (expiresAt && Date.now() < expiresAt) {
        setOpeningTime(openingTime);
        setClosingTime(closingTime);
        setSpecialEvent(specialEvent);
        setEarlyEntry(earlyEntry);
        return;
      } else {
        localStorage.removeItem(`park.${parkUrl}.hours`);
      }
    }
    axios.get(`http://localhost:8000/waittimes/${park.hoursUrl}`).then((res) => {
      const formattedOpening = moment(res.data[0].openingTime).format("h:mm A");
      const formattedClosing = moment(res.data[0].closingTime).format("h:mm A");
      setOpeningTime(formattedOpening);
      setClosingTime(formattedClosing);

      const specialEventObj = res.data[0]?.special?.find(
        (event) => event.description === "Special Ticketed Event"
      );
      const earlyEntryObj = res.data[0]?.special?.find(
        (event) => event.description === "Early Entry"
      );
      console.log("Special Event Obj:", specialEventObj);
      if (specialEventObj) {
        const newSpecialEvent = {
          openingTime: moment(specialEventObj.openingTime).format("h:mm A"),
          closingTime: moment(specialEventObj.closingTime).format("h:mm A"),
          type: specialEventObj.description,
        };
        setSpecialEvent(newSpecialEvent);
      }

      if (earlyEntryObj) {
        const newEarlyEntry = {
          openingTime: moment(earlyEntryObj.openingTime).format("h:mm A"),
          closingTime: moment(earlyEntryObj.closingTime).format("h:mm A"),
          type: earlyEntryObj.description,
        };
        setEarlyEntry(newEarlyEntry);
      } 
      setLocalStorageData(
        park.name,
        formattedOpening,
        formattedClosing,
        specialEventObj
          ? {
              openingTime: moment(specialEventObj.openingTime).format("h:mm A"),
              closingTime: moment(specialEventObj.closingTime).format("h:mm A"),
              type: specialEventObj.description,
            }
          : { openingTime: "", closingTime: "", type: null },
        earlyEntryObj
          ? {
              openingTime: moment(earlyEntryObj.openingTime).format("h:mm A"),
              closingTime: moment(earlyEntryObj.closingTime).format("h:mm A"),
              type: earlyEntryObj.description,
            }
          : { openingTime: "", closingTime: "", type: null }
      );

    });
  }, []);


  const setLocalStorageData = (parkName, openingTime, closingTime, specialEvent, earlyEntry) => {
    const data = {
      openingTime,
      closingTime,
      specialEvent,
      earlyEntry,
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour from now
    };
    localStorage.setItem(`park.${parkUrl}.hours`, JSON.stringify(data));
  };

  return (
    <div className="rounded overflow-hidden shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Link
        to={`/${parkUrl}`}
        parkopening={openingTime}
        parkclosing={closingTime}
        className="flex flex-col xs:items-center rounded-lg md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 card-img"
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
          <div className="mb-3 font-normal">
            <p>
              Park Hours: {openingTime} - {closingTime}
            </p>
          </div>
          {earlyEntry.type && (
           <div className="mb-3 font-normal">
              <p>
                {earlyEntry.type}: {earlyEntry.openingTime} - {earlyEntry.closingTime}
              </p>
            </div>
          )}
          {specialEvent.type && (
            <div className="mb-3 font-normal">
              <p>
                {specialEvent.type}: {specialEvent.openingTime} - {specialEvent.closingTime}
              </p>
            </div>
          )}

        </div>
      </Link>
    </div>
  );
};

export default ParkCard;
