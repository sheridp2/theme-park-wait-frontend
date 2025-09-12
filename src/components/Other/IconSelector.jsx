import React, { useState } from "react";
import Input from "../Inputs/Input";
import { ICON_OPTIONS } from "../../util/data";

const IconSelector = ({ handleIconSelect, icon }) => {
  const [customeUrlOpen, setCustomUrlOpen] = useState(false);

  const handleInputSwitchClick = (e) => {
    e.preventDefault();
    handleIconSelect("");
    setCustomUrlOpen(!customeUrlOpen);
  }

  return (
    <>
      <div>
        <button
          onClick={handleInputSwitchClick}
          className="m-2 text-sm text-blue-500 hover:underline"
        >
          {customeUrlOpen ? "Select from icons" : "Use custom icon"}
        </button>
      </div>
      <div>
        {customeUrlOpen ? (
          <div className="">
            <Input
              value={icon}
              onChange={({ target }) => handleIconSelect(target.value)}
              placeholder="https://example.com/icon.png"
              type="text"
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {ICON_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`flex items-center justify-center w-20 h-20 rounded-full border-2 transition 
                ${icon === item.iconUrl ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'} 
                hover:bg-blue-50 hover:scale-110`}
                onClick={() => handleIconSelect(item.iconUrl)}
                aria-pressed={icon === item.iconUrl}
              >
                <img
                  src={item.iconUrl}
                  alt={`Icon ${item.id}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default IconSelector;
