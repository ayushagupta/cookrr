import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { BASE_URL } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const PostCard = ({ _id, title, author, image, tags }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div
      onClick={() => navigate(`/post/${_id}`)}
      className="cursor-pointer bg-white shadow rounded p-4 mb-6 hover:shadow-md transition-shadow"
    >
      <img
        src={`${BASE_URL}${image}`}
        alt={title}
        className="aspect-[4/3] w-full overflow-hidden rounded"
      />

      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-sm text-orange-500">
        <Link
          to={`/profile/${author._id}`}
          className="hover:underline hover:text-orange-700"
          onClick={(e) => e.stopPropagation()}
        >
          {author.fullName}
        </Link>
      </p>

      <div className="mt-2">
        {tags.map((tag, idx) => (
          <Link
            to={`/tags/${encodeURIComponent(tag)}`}
            key={idx}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              key={idx}
              className="text-xs bg-orange-100 text-orange-700 rounded px-2 py-1 mr-2"
            >
              #{tag}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex items-center mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={20}
            onClick={(e) => {
              e.stopPropagation();
              setRating(star);
            }}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`cursor-pointer transition-colors ${
              star <= (hovered || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          Your rating: {rating}
        </span>
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4 relative">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border px-3 py-2 rounded outline-none"
        />
        <button
          type="submit"
          onClick={(e) => e.stopPropagation()}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-800"
        >
          <FaPaperPlane size={18} />
        </button>
      </form>

      {comments.length > 0 && (
        <div className="mt-3 space-y-2">
          {comments.map((c, idx) => (
            <p key={idx} className="text-sm text-gray-800 border-b pb-1">
              {c}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
