const express = require("express");
const postController = require("../controlllers/post");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/createPost", authMiddleware,upload.single("image"), postController.createPost);  // Protected
router.put("/updatePost/:id", authMiddleware, postController.updatePost); // Protected
router.delete("/deletePost/:id", authMiddleware, postController.deletePost); // Protected
router.get("/posts", postController.getAllPosts); 
router.get("/post/:id", postController.getPostById); 
router.get("/user/posts/",authMiddleware, postController.getUserPosts); // Protected

router.post("/post/:id/like", authMiddleware, postController.likePost); // Protected
router.post("/post/:id/comment", authMiddleware, postController.addComment); // Protected

module.exports = router;
