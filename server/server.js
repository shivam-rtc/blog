require("dotenv").config();
require("./config/passport");
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const morgan = require("morgan");
const winston = require("winston");
//db
require("./db");

//imports routes
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

//port
const PORT = process.env.PORT || 5000;

// Create Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "requests.log" })],
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
// allow to access file
app.use(express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend URL
    credentials: true, // Allow cookies
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// use routes
app.use("/api", userRouter);
app.use("/api", postRouter);

app.listen(PORT, (req, res) => {
  console.log(`server is running on ${PORT}`);
});

// Start the server only if not in test mode

// if (process.env.NODE_ENV !== "test") {
//   app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
//   });
// }

module.exports = app;
