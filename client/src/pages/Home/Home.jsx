import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Cards/PostCard";

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
    </div>
  );
};

export default Home;
