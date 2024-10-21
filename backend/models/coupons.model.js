const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');  // Correct import path

const Coupon = sequelize.define('Coupon', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  validUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'coupons'
});

module.exports = Coupon;
