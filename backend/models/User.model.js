const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');
const Order = require('./Order.model');  // Import Order model

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "admin"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users'
});

// Define relationship
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

module.exports = User;
