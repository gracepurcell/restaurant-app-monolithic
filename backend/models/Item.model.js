const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');  // Ensure sequelize is imported

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,  // URL of the image stored in Cloudinary or elsewhere
  }
}, {
  tableName: 'items'
});

module.exports = Item;
