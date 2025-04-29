import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Cards/PostCard";
import { MdAdd } from "react-icons/md";

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

const userInfo = {
  fullName: "Test User",
};

// const userInfo = "";

const Home = () => {
  return (
    <div className="pt-20">
      <Navbar userInfo={userInfo} />
      <div className="max-w-3xl mx-auto mt-6 px-4">
        {dummyPosts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-600 fixed right-8 bottom-8 z-40"
        onClick={() => {}}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
    </div>
  );
};

export default Home;
