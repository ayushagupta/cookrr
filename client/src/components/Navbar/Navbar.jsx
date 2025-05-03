import React, { useState, useContext } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ProfileIconCard from "../Cards/ProfileIconCard";
import ProfileDropdown from "../Menu/ProfileDropdown";
import AuthModal from "../Auth/AuthModal";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const handleLogout = () => {
    localStorage.removeItem("cookrr-token");
    localStorage.removeItem("cookrr-user");
    setCurrentUser(null);
    setShowDropdown(false);
    navigate("/");
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

      {currentUser ? (
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <ProfileIconCard userInfo={currentUser} />
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
