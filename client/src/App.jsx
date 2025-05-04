import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SearchResults from "./pages/Search/SearchResults";
import TagCounts from "./pages/Tags/TagCounts";
import TagResults from "./pages/Tags/TagResults";
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
          <Route path="/search" element={<SearchResults />} />
          <Route path="/tags" element={<TagCounts />} />
          <Route path="/tags/:tag" element={<TagResults />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
