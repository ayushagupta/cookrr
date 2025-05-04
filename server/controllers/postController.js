const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const tags = req.body.tags
      ? req.body.tags.split(",").map((t) => t.trim())
      : [];
    const author = req.user.id;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await Post.create({ title, content, image, tags, author });
    res.status(201).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Post creation failed", error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "fullName email");
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "fullName email"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : post.image;

    const updatedData = {
      title: req.body.title || post.title,
      content: req.body.content || post.content,
      tags: req.body.tags
        ? req.body.tags.split(",").map((t) => t.trim())
        : post.tags,
      image,
    };

    const updated = await Post.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

exports.searchPosts = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const regex = new RegExp(query, "i");

    const posts = await Post.find({
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } },
        { tags: { $regex: regex } },
      ],
    }).populate("author", "fullName email");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

exports.getTagsWithCount = async (req, res) => {
  try {
    const result = await Post.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $project: { tag: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to count tags", error: err.message });
  }
};

exports.getPostsByTag = async (req, res) => {
  const tag = req.params.tag;
  try {
    const posts = await Post.find({ tags: tag }).populate("author", "fullName email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({message: "Failed to get posts by tag", error: error.message});
  }
};