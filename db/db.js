const Sequelize = require('sequelize');
require('dotenv').config();
require('dotenv').load();

const db = new Sequelize('Spindr_PG_DB', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DATABASE_URL,
  port: process.env.DATABASE_PORT,
  dialect: "postgres"
})

db.authenticate()
.then(() => {
  console.log('Successfully Connected to Database');
})
.catch(err => {
  console.log('Error Occur when Connecting to Database');
})

module.exports = db;