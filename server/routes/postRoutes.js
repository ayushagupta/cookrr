const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.post("/", auth, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", auth, upload.single("image"), updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;