import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfilePostCard from "../../components/Cards/ProfilePostCard";
import AddEditPost from "../../components/AddEditPost/AddEditPost";
import Modal from "react-modal";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [openEditPostModal, setOpenEditPostModal] = useState({
    type: "edit",
    isShown: false,
    data: null,
  });

  const { currentUser } = useContext(AuthContext);

  const handleEdit = (post) => {
    setOpenEditPostModal({
      type: "edit",
      isShown: true,
      data: post,
    });
  };

  const getUserData = async () => {
    try {
      const res = await axios.get(`/api/user/${userId}`);
      setUser(res.data.user);
      setUserPosts(res.data.posts || []);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const deletePost = async (post) => {
    const postId = post._id;
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      if (response.status === 200) {
        console.log("Post deleted successfully");
        getUserData();
      } else {
        console.log("Failed to delete post");
      }
    } catch (error) {
      console.log("Error deleting post");
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <div>
      <Sidebar />
      <div className="pl-60 pt-20">
        <Navbar />
        {user && (
          <div className="max-w-5xl mx-auto px-4 mt-4">
            <div className="bg-white rounded drop-shadow p-4 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{user.fullName}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-1 text-sm rounded bg-orange-600 text-white hover:bg-orange-700">
                  Follow
                </button>
                <button className="px-4 py-1 text-sm rounded border border-orange-600 text-orange-600 hover:bg-orange-50">
                  Message
                </button>
              </div>
            </div>

            {userPosts.length === 0 ? (
              <p className="text-gray-500">No posts yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts.map((post) => (
                  <ProfilePostCard
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    image={post.image}
                    onEdit={() => handleEdit(post)}
                    onDelete={() => deletePost(post)}
                    isOwner={String(currentUser?.id) === String(user._id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <Modal
          isOpen={openEditPostModal.isShown}
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
            postData={openEditPostModal.data}
            type={openEditPostModal.type}
            getUserData={getUserData}
            onClose={() => {
              setOpenEditPostModal({ type: "edit", isShown: false });
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
