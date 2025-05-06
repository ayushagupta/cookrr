import React from "react";
import { BASE_URL } from "../../utils/constants";
import { MdCreate, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProfilePostCard = ({ id, title, image, onEdit, onDelete, isOwner }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/post/${id}`)}
      className="cursor-pointer rounded overflow-hidden shadow-sm bg-white hover:shadow transition-shadow"
    >
      <img
        src={`${BASE_URL}${image}`}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="flex items-center justify-between p-2">
        <p className="text-sm font-medium truncate">{title}</p>
        {isOwner && (
          <div className="flex items-center gap-2">
            <MdCreate
              className="text-xl text-slate-300 cursor-pointer hover:text-green-600"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            />
            <MdDelete
              className="text-xl text-slate-300 cursor-pointer hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePostCard;
