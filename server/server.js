require("dotenv").config();
require("./config/passport");
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
//db
require("./db");

//imports routes
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend URL
  credentials: true, // Allow cookies
  methods: "GET,POST,PUT,DELETE",
}));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// use routes
app.use("/api", userRouter);
app.use("/api", postRouter);
app.listen(PORT, (req, res) => {
  console.log(`server is running on ${PORT}`);
});
