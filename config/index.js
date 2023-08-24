const database = require('./db');
const others = require('./others');

module.exports = {
  database,
  ...others,
};
