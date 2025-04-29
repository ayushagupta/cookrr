import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ProfileIconCard from "../Cards/ProfileIconCard";

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white drop-shadow py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-orange-600">Cookrr</h1>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      {userInfo ? (
        <ProfileIconCard userInfo={userInfo} />
      ) : (
        <button className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors">
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
