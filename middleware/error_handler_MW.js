const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  console.log("handler: ", customError);
  res.status(customError.statusCode).json(customError.msg);
};

module.exports = errorHandler;
