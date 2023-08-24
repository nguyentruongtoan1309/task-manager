const httpStatus = require('http-status');
const ApiError = require('../utils/errors');
const { ValidationError } = require('express-validation');
const { ValidationError: ORMValidationError } = require('sequelize');

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (err instanceof ValidationError || err instanceof ORMValidationError) {
    return res.status(err.statusCode || 400).json(err);
  }

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||  httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { status: statusCode } = err || {};

  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message: err.message,
    stack: err.stack,
    isSuccess: false,
    data: null,
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
