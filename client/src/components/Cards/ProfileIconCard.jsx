import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileIconCard = ({ userInfo }) => {
  return (
    userInfo && (
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-800 text-sm font-medium">
        {getInitials(userInfo?.fullName)}
      </div>
    )
  );
};

export default ProfileIconCard;

