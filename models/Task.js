const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/dbHelper');

class Task extends Model { }
Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.ENUM('TODO', 'DOING', 'CANCEL', 'DONE'), defaultValue: 'TODO' },
}, {
  sequelize,
  modelName: 'tasks',
});

module.exports = Task;
