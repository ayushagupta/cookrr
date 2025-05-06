import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const getPostDetails = async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.log("Failed to get post", error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [postId]);

  if (!post) return null;

  return (
    <div>
      <Sidebar />
      <div>
        <Navbar />
        <div className="pt-24 max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {post.title}
          </h1>
          <Link
            to={`/profile/${post.author._id}`}
            className="text-md text-gray-500 hover:underline hover:text-orange-700 mb-4 block"
          >
            {post.author.fullName}
          </Link>

          <img
            src={`${BASE_URL}${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover rounded mb-6"
          />

          <div className="text-gray-800 text-sm whitespace-pre-line mb-6">
            {post.content}
          </div>

          <div className="mb-8">
            {post.tags.map((tag, idx) => (
              <Link to={`/tags/${encodeURIComponent(tag)}`} key={idx}>
                <span
                  key={idx}
                  className="text-xs bg-orange-100 text-orange-700 rounded px-2 py-1 mr-2"
                >
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
