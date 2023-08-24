const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/dbHelper');

class User extends Model { }
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'users',
  },
);

module.exports = User;
