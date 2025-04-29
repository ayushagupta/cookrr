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
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-6 px-4">
        {dummyPosts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
