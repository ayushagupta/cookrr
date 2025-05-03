import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import RedirectToOwnProfile from "./pages/Profile/RedirectToOwnProfile";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/me" element={<RedirectToOwnProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
