import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RedirectToOwnProfile = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return <Navigate to={`/profile/${currentUser.id}`} />;
};

export default RedirectToOwnProfile;
