const {errorHandler, errorConverter} = require('./errorHandler');
const authJWT = require('./auth');
const rateLimiter = require('./rateLimiter');


module.exports = {
  errorHandler,
  errorConverter,
  ...authJWT,
  rateLimiter,
};