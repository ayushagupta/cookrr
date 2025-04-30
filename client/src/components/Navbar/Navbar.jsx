import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ProfileIconCard from "../Cards/ProfileIconCard";
import ProfileDropdown from "../Menu/ProfileDropdown";
import AuthModal from "../Auth/AuthModal";

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const handleLogout = () => {
    setShowDropdown(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white drop-shadow py-4 px-8 flex justify-between items-center">
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
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <ProfileIconCard userInfo={userInfo} />
          </div>

          {showDropdown && (
            <ProfileDropdown
              onLogout={handleLogout}
              onClose={() => setShowDropdown(false)}
            />
          )}
        </div>
      ) : (
        <>
          <button
            className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors"
            onClick={() => setShowAuthModal(true)}
          >
            Login
          </button>
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
