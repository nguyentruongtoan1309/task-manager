const jwtConfig = {
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  EXPIRE_IN: process.env.JWT_EXPIRE_IN,
};

module.exports = { jwtConfig };
