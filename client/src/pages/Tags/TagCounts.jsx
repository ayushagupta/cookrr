import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const TagCounts = () => {
  const [tags, setTags] = useState([]);

  const getTagCounts = async () => {
    try {
      const response = await axios.get("/api/posts/tags/count");
      setTags(response.data);
    } catch (error) {
      console.log("Failed to get tags:", error);
    }
  };

  useEffect(() => {
    getTagCounts();
  }, []);

  return (
    <div>
      <Sidebar />
      <div>
        <Navbar />
        <div className="pt-24 max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-orange-600 inline-block pb-1 tracking-wide">
            Explore Tags
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tags.map(({ tag, count }) => (
              <Link
                to={`/tags/${tag}`}
                key={tag}
                className="bg-orange-100 rounded p-3 hover:bg-orange-200 transition-colors"
              >
                <p className="text-sm font-medium text-orange-700">#{tag}</p>
                <p className="text-xs text-gray-600">{count} posts</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagCounts;
