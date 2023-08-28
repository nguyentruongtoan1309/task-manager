const jwtConfig = {
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  EXPIRE_IN: process.env.JWT_EXPIRE_IN,
  JWT_REFRESH_TOKEN_SECRET_KEY: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRE_IN: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,
};

module.exports = { jwtConfig };
