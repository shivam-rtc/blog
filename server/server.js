const express = require("express");

//imports routes
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
require("dotenv").config();
//
const app = express();
require("./db");
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// use routes
app.use("/api", userRouter);
app.use("/api", postRouter);
app.listen(PORT, (req, res) => {
  console.log(`server is running on ${PORT}`);
});
