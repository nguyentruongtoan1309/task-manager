const { sequelize, ensureDbExists } = require('../utils/dbHelper');
const logger = require('../utils/logger');
const Task = require('./Task');
const User = require('./User');

User.hasMany(Task, {
  foreignKey: 'userId'
});
Task.belongsTo(User);

async function dbInitialize() {
  try {
    await ensureDbExists();
    await sequelize.authenticate();
    logger.info('Connection MSSQL successfully.');
    await sequelize.sync();
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  dbInitialize,
  User,
  Task,
};
