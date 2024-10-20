const app = require("./app");

const sequelize = require('./db/index');

// Sync all models to the PostgreSQL database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 6001
const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
