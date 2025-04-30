import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const AddPost = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagList = tags.split(",").map((tag) => tag.trim());
    
    // API call
    
    onClose();
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 z-10 hover:bg-slate-50"
        onClick={onClose}
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
          className="block"
        />

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
