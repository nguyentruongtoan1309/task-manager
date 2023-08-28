require('./globals');
const express = require('express');
const {dbInitialize} = require('./models');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

const routes = require('./routes');
const PORT = process.env.PORT || 5000;

const { errorHandler, errorConverter, rateLimiter } = require('./middleware');
const { jwtStrategy } = require('./utils/auth');
const logger = require('./utils/logger');
const APIError = require('./utils/errors');

const app = express();
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(rateLimiter);

app.use('/', routes);
app.all('*', (req, res, next) => {
  const err = new APIError({status: 404, message:`Route ${req.originalUrl} not found`});
  next(err);
});

app.use(errorConverter);
app.use(errorHandler);
app.listen(PORT, async () => {
  logger.info(`Server listening on port ${PORT}`);
  await dbInitialize();
});
