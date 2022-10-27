// require packages
require("dotenv").config();
require("express-async-errors");

// require framework
const express = require("express");
const app = express();

const connectToDB = require("./connect");
// require mw
const errorHandler = require("./middleware/errors/error_handler_MW");
const notFound = require("./middleware/errors/not_found_MW");

// require routes
const router = require("./routes/recipeRoutes");

//--------------------------------------------------------

// globals
const port = 4000;

// middleware

app.use(express.json());

// routes
app.use("/api/v1", router);

app.get("/hello-world", (req, res) => {
  console.log("DONE");
  res.status(200).json("Hello World! This is the new BREADINATOR");
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
