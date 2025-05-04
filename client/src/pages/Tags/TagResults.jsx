import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import PostCard from "../../components/Cards/PostCard";

const TagResults = () => {
  const { tag } = useParams();
  const [tagPosts, setTagPosts] = useState([]);

  const getTagPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/tags/${tag}`);
      setTagPosts(response.data);
    } catch (error) {
      console.log("Failed to get tag posts", error);
    }
  };

  useEffect(() => {
    getTagPosts();
  }, [tag]);

  return (
    <div>
      <Sidebar />
      <div>
        <Navbar />
        <div className="pt-24 max-w-xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">
          Posts tagged:
          <span className="text-orange-600"> #{tag}</span>
          </h2>
          {tagPosts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagResults;
