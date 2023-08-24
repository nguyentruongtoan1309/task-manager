const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const {jwtConfig} = require('../config');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const jwtOptions = {
  secretOrKey: jwtConfig.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
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

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
  generateAccessToken,
};