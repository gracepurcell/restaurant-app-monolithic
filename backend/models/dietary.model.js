const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');  // Correct import path

const Dietary = sequelize.define('Dietary', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'dietaries'
});

module.exports = Dietary;
