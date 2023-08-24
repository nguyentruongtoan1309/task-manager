const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateAccessToken } = require('../utils/auth');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const APIError = require('../utils/errors');

const signUp = catchAsync(async (req, res) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ ...req.body, password: hashedPassword });
  res.status(httpStatus.CREATED).send(user);
});

const signIn = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = { id: user.id, username };
    const accessToken = generateAccessToken(payload);
    res.send({accessToken});
  } else {
    throw new APIError({status: httpStatus.UNAUTHORIZED, message: httpStatus['401_MESSAGE']});
  }
});

const getProfile = catchAsync(async (req,res,next) => {
  if (req.user) {
    res.send(req.user);
  } else {
    throw new APIError({status: httpStatus.UNAUTHORIZED, message: httpStatus['401_MESSAGE']});
  }
});

module.exports = {
  signUp,
  signIn,
  getProfile
};
