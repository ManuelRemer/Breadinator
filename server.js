require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const port = 3000;
const connectToDB = require("./connect");
const errorHandler = require("./middleware/error_handler_MW");
const notFound = require("./middleware/not_found_MW");
const router = require("./routes/recipeRoutes");

// middelware

app.use(express.json());

// routes
app.use("/api/v1", router);

app.get("/hello", (req, res) => {
  res.send("Hello World! This is the new BREADINATOR");
});

app.use(errorHandler);
app.use(notFound);

// start server + connect to db
const start = async (port) => {
  try {
    await connectToDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start(port);
