const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');  // Correct import path

const Campaign = sequelize.define('Campaign', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'campaigns'
});

module.exports = Campaign;
