const express = require("express");
const postController = require("../controlllers/post");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/createPost", authMiddleware, postController.createPost);  // Protected
router.put("/updatePost/:id", authMiddleware, postController.updatePost); // Protected
router.delete("/deletePost/:id", authMiddleware, postController.deletePost); // Protected
router.get("/posts", postController.getAllPosts); // Public
router.get("/post/:id", postController.getPostById); // Public
router.post("/post/:id/like", authMiddleware, postController.likePost); // Protected
router.post("/post/:id/comment", authMiddleware, postController.addComment); // Protected

module.exports = router;
