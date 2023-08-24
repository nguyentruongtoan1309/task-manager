require('./globals');
const express = require('express');
const {dbInitialize} = require('./models');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const PORT = process.env.PORT || 5000;
const { errorHandler, errorConverter, rateLimiter } = require('./middleware');
const passport = require('passport');
const { jwtStrategy } = require('./utils/auth');
const logger = require('./utils/logger');
const app = express();
const corsOptions = {
  origin: 'http://localhost:5000',
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(rateLimiter);

(async () => {
  await dbInitialize();
})();

app.use('/', routes);

app.use(errorConverter);
app.use(errorHandler);
app.listen(PORT, logger.debug(`Server listening on port ${PORT}`));
