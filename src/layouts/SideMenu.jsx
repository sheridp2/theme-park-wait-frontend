import React, { useContext } from "react";

import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SIDE_MENU_DATA } from "../util/data";
import { FaUser } from "react-icons/fa";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    toast.success("Successfully logged out");
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {SIDE_MENU_DATA.main.map((item, index) => ( 
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 `}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

      {user ? (
           
          <button
            
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu == SIDE_MENU_DATA.user[0].label ? "text-white bg-primary" : ""
            } py-3 px-6 rounded-lg mb-3 `}
            onClick={() => handleClick(SIDE_MENU_DATA.user[0].path)}
          >
            <FaUser className="text-xl" />
            {SIDE_MENU_DATA.user[0].label === "User Page" && user ? `${user.fullName}'s Page` : SIDE_MENU_DATA.user[0].label}
          </button>
      
        ) : (
          <button
            
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu == SIDE_MENU_DATA.user[1].label ? "text-white bg-primary" : ""
            } py-3 px-6 rounded-lg mb-3 `}
            onClick={() => handleClick(SIDE_MENU_DATA.user[1].path)}
          >
            <FaUser className="text-xl" />
            {SIDE_MENU_DATA.user[1].label === "User Page" && user ? `${user.fullName}'s Page` : SIDE_MENU_DATA.user[0].label}
          </button>
          
        )}


      <h4 className="text-md font-semibold mb-4 pt-4">Disney World</h4>
      {SIDE_MENU_DATA.disneyworld.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 `}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

      <h4 className="text-md font-semibold mb-4 pt-4">Disneyland</h4>
      {SIDE_MENU_DATA.disneyland.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 `}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
