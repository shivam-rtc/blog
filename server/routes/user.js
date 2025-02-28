const express = require("express");
const userController = require("../controlllers/user");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/users",authMiddleware, userController.users);



module.exports = router;
