const rateLimit =  require('express-rate-limit');
const httpStatus = require('http-status');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  statusCode: httpStatus.TOO_MANY_REQUESTS,
  message:{
    isSuccess: false,
    message: httpStatus['429_MESSAGE'],
  }
});

module.exports = rateLimiter;