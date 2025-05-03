import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Cards/PostCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddPost from "./AddPost";

const dummyPosts = [
  {
    title: "Spicy Butter Chicken",
    author: "Ayush Gupta",
    image: "https://source.unsplash.com/featured/?butter-chicken",
    tags: ["Indian", "Spicy"],
  },
  {
    title: "Vegan Tofu Bowl",
    author: "Priya Shah",
    image: "https://source.unsplash.com/featured/?tofu",
    tags: ["Vegan", "Healthy"],
  },
  {
    title: "Spicy Butter Chicken",
    author: "Ayush Gupta",
    image: "https://source.unsplash.com/featured/?butter-chicken",
    tags: ["Indian", "Spicy"],
  },
  {
    title: "Vegan Tofu Bowl",
    author: "Priya Shah",
    image: "https://source.unsplash.com/featured/?tofu",
    tags: ["Vegan", "Healthy"],
  },
];

// const userInfo = {
//   fullName: "Test User",
// };

const userInfo = "";

const Home = () => {
  const [openAddPostModal, setOpenAddPostModal] = useState(false);

  return (
    <div className="pt-20">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-6 px-4">
        {dummyPosts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-600 fixed right-8 bottom-8 z-40"
        onClick={() => {
          setOpenAddPostModal(true);
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddPostModal}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-32 p-5 overflow-auto"
        appElement={document.getElementById("root")}
      >
        <AddPost
          onClose={() => {
            setOpenAddPostModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Home;
