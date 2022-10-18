require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const connectToDB = require("./connect");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async (port) => {
  try {
    await connectToDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start(port);
