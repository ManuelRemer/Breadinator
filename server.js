const express = require("express");
const app = express();
const port = 3000;
const connectToDB = require("./connect");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async (port) => {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start(port);
