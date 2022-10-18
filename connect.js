const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://Manuel:buchlade@cluster0.rxeek.mongodb.net/Breadinator?retryWrites=true&w=majority";

const connectToDB = async (url) => {
  await mongoose.connect(connectionString);
};

// mongoose
//   .connect(connectionString)
//   .then(() => console.log("CONNECTED TO DB..."))
//   .catch((err) => console.log(err));

module.exports = connectToDB;
