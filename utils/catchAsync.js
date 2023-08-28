const APIError = require('./errors');

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(new APIError({
    message: err.message, stack: err.stack, errors:err, status: err.statusCode})));
};

module.exports = catchAsync;