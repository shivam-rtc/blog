const Post = require("../models/post");
const User = require("../models/user");
const { success, error } = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const postController = {
  // Create a new post=> Done
  createPost: async (req, res) => {
    try {
      const { title, content, category, status } = req.body;
      const author = req.user.id;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      if (!title || !content) {
        return error(res, "Title and content are required", 404);
      }

      const newPost = new Post({
        title,
        content,
        author,
        category,
        status,
        image: imageUrl,
      });

      await newPost.save();
      return success(res, newPost, "Post created successfully", 201);
    } catch (error) {
      return new ApiError("Failed to create post", 500);
    }
  },

  // Get all posts (with pagination)
  getAllPosts: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find({ status: "published" })
        .populate("author", "name email") // Populates author details
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
      // return success(res, posts, "Posts retrieved successfully", 200);
      res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch posts", error: error.message });
    }
  },

  // Get a single post by ID
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name");
      if (!post) return res.status(404).json({ message: "Post not found" });

      // return success(res, post, "Post retrived successfully")
      res.status(200).json({ message: "Post retrieved successfully", post });
    } catch (error) {
      // error(res, "failed to fetch post", 400)
      res
        .status(500)
        .json({ message: "Failed to fetch post", error: error.message });
    }
  },
  

  // Get posts created by the logged-in user
  getUserPosts: async (req, res) => {
    try {
      const userId = req.user.id;
      const posts = await Post.find({ author: userId })
        .populate("author", "name email")
        .sort({ createdAt: -1 });

      res
        .status(200)
        .json({ message: "User's posts retrieved successfully", posts });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch user's posts",
        error: error.message,
      });
    }
  },

  // Update a post (Only author can update)
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, category, status } = req.body;
      const userId = req.user.id;

      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      // Check if logged-in user is the author
      console.log("post.author.toString()", post.author.toString());
      console.log("userId", userId);

      if (post.author.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized to edit this post" });
      }

      post.title = title || post.title;
      post.content = content || post.content;
      post.category = category || post.category;
      post.status = status || post.status;

      await post.save();
      res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update post", error: error.message });
    }
  },

  // Delete a post (Only author can delete)
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      if (post.author.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized to delete this post" });
      }

      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete post", error: error.message });
    }
  },

  // Like a post
  likePost: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id id", id);

      const userId = req.user.id;
      console.log("userId", userId);

      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((like) => like.toString() !== userId);
      } else {
        post.likes.push(userId);
      }

      await post.save();
      res.status(200).json({
        message: "Post like status updated",
        likes: post.likes.length,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to like post", error: error.message });
    }
  },

  // Add a comment
  addComment: async (req, res) => {
    try {
      console.log("request", req.body);
      const { id } = req.params;
      const { text } = req.body;
      const userId = req.user.id;

      if (!text)
        return res.status(400).json({ message: "Comment cannot be empty" });

      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      // Fetch user details (name)
      const user = await User.findById(userId).select("name");
      post.comments.push({ user: userId, text, createdAt: new Date() });
      await post.save();
      // Now populate after saving
      await post.populate("comments.user", "name");

      res.status(201).json({
        message: "Comment added successfully",
        comments: post.comments,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add comment", error: error.message });
    }
  },
};

module.exports = postController;
