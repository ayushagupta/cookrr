import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!user) return <div className="text-center mt-20">User not found</div>;

  return (
    <>
      <Navbar userInfo={user} />
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold mb-2">{user.fullName}</h2>
        <p className="text-gray-600">{user.bio || "No bio provided."}</p>
        
      </div>
    </>
  );
};

export default Profile;
