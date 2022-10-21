const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.name === "CastError") {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      msg: `can't find ${err.kind} with ${err.value}`,
      type: "no such entry in db",
    };
  }
  console.log("handler: ", err);
  res.status(customError.statusCode).json(customError);
};

module.exports = errorHandler;
