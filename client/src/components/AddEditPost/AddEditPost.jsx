import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "../../utils/axiosInstance";

const AddEditPost = ({ postData, type, onClose, getAllPosts, getUserData }) => {
  const [title, setTitle] = useState(postData?.title || "");
  const [content, setContent] = useState(postData?.content || "");
  const [tags, setTags] = useState(postData?.tags || "");
  const [image, setImage] = useState(postData?.image || null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API call
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);
      formData.append("image", image);

      const response =
        type === "add"
          ? await axios.post("/api/posts", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
          : await axios.put(`/api/posts/${postData._id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

      if (type === "add") {
        if (response.status === 201) {
          console.log("Post created successfully:", response.data);
          getAllPosts();
          handleClose();
        } else {
          setError("Failed to create post. Please try again.");
        }
      } else {
        if (response.status === 200) {
          console.log("Post edited successfully:", response.data);
          getUserData();
          handleClose();
        } else {
          setError("Failed to edit post. Please try again.");
        }
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    }
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setTags("");
    setImage(null);
    setError("");
    onClose();
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 z-10 hover:bg-slate-50"
        onClick={handleClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <form onSubmit={handleSubmit} className="space-y-4 pt-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded outline-none"
        />

        <textarea
          placeholder="Write your recipe or story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
          className="w-full border px-4 py-2 rounded outline-none resize-none"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border px-4 py-2 rounded outline-none"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={type === "add"}
          className="block"
        />

        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          {type === "add" ? "POST" : "UPDATE"}
        </button>
      </form>
    </div>
  );
};

export default AddEditPost;
