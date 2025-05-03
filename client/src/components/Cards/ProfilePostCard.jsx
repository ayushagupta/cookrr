import React from "react";
import { BASE_URL } from "../../utils/constants";

const ProfilePostCard = ({ title, image }) => {
  return (
    <div className="rounded overflow-hidden shadow-sm bg-white hover:shadow transition-shadow cursor-pointer">
      <img
        src={`${BASE_URL}${image}`}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <p className="text-sm font-medium truncate">{title}</p>
      </div>
    </div>
  );
};

export default ProfilePostCard;
