const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

// Initialize Sequelize with PostgreSQL connection details
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Optional: Disable logging of SQL queries
});

sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL!'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;  // Ensure you are exporting the `sequelize` instance
