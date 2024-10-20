const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');  // Correctly importing Sequelize instance

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'orders'
});

module.exports = Order;
