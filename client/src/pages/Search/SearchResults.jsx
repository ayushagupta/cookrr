import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import PostCard from "../../components/Cards/PostCard";
import Sidebar from "../../components/Sidebar/Sidebar";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios.get(`/api/posts/search?query=${query}`).then((res) => {
        setResults(res.data);
      });
    }
  }, [query]);

  return (
    <div>
      <Sidebar />
      <div>
        <Navbar />
        <div className="pt-24 max-w-xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">
            Search results for:{" "}
            <span className="text-orange-600">"{query}"</span>
          </h2>

          {results.length === 0 ? (
            <p className="text-gray-500">No results found.</p>
          ) : (
            results.map((post) => <PostCard key={post._id} {...post} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
