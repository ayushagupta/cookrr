import React from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ onLogout, onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
      <Link
        to="/profile/me"
        onClick={onClose}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Profile
      </Link>
      <button
        onClick={onLogout}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
