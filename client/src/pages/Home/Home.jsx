import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/Cards/PostCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditPost from "../../components/AddEditPost/AddEditPost";
import axios from "../../utils/axiosInstance";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  const [openAddPostModal, setOpenAddPostModal] = useState({
    type: "add",
    isShown: false,
  });
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      if (Array.isArray(response.data)) {
        setAllPosts(response.data);
      }
    } catch (error) {
      console.log(
        "An unexpected error occured while fetching notes. Please try again."
      );
    }
  };

  useEffect(() => {
    getAllPosts();
    return () => {};
  }, []);

  return (
    <div>
      <Sidebar />
      <div>
        <Navbar />
        <div className="pt-20 max-w-xl mx-auto mt-6 px-4">
          {allPosts.map((post, i) => (
            <PostCard key={i} {...post} />
          ))}
        </div>
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-600 fixed right-8 bottom-8 z-40"
          onClick={() => {
            setOpenAddPostModal({ type: "add", isShown: true });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        <Modal
          isOpen={openAddPostModal.isShown}
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
          <AddEditPost
            type={openAddPostModal.type}
            onClose={() => {
              setOpenAddPostModal({ type: "add", isShown: false });
            }}
            getAllPosts={getAllPosts}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
