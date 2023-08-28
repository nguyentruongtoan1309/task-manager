const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const {jwtConfig} = require('../config');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const jwtOptions = {
  secretOrKey: jwtConfig.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (req, payload, done) => {
  try {
    const user = await User.findByPk(payload.id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

function generateAccessToken(payload) {
  return jwt.sign(payload, jwtConfig.SECRET_KEY, { expiresIn: jwtConfig.EXPIRE_IN });
}

async function signToken(payload) {
  const accessToken = jwt.sign(payload, jwtConfig.SECRET_KEY, { expiresIn: jwtConfig.EXPIRE_IN });
  const refreshToken = jwt.sign(payload, jwtConfig.JWT_REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: jwtConfig.JWT_REFRESH_TOKEN_EXPIRE_IN });
  return {accessToken, refreshToken};
}

function verifyJwt(token) {
  return jwt.verify(token, jwtConfig.JWT_REFRESH_TOKEN_SECRET_KEY);
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
  generateAccessToken,
  signToken,
  verifyJwt,
};