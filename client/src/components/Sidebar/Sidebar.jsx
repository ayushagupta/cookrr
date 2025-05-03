import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdHome,
  MdLocalDining,
  MdMessage,
  MdPerson,
  MdSettings,
  MdTag 
} from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: <MdHome size={22} />, path: "/" },
    { label: "Messages", icon: <MdMessage size={22} />, path: "/messages" },
    {
      label: "Communities",
      icon: <MdLocalDining size={22} />,
      path: "/communities",
    },
    { label: "Tags", icon: <MdTag size={22} />, path: "/tags" },
    { label: "Profile", icon: <MdPerson size={22} />, path: "/profile/me" },
    { label: "Settings", icon: <MdSettings size={22} />, path: "/settings" },
  ];

  return (
    <div className="w-56 h-screen fixed top-0 left-0 bg-white shadow-md p-4 pt-20">
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              location.pathname === item.path
                ? "bg-orange-100 text-orange-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
