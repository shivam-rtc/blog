const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoose is connected");
  })
  .catch((error) => {
    console.log("mongoose is not connected", error);
  });
