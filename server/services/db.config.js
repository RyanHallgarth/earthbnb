/* eslint-disable no-console */
const mysql = require('mysql');

// Database Connection for Production

const connection = mysql.createConnection({
  host: process.env.DB_ADDRESS,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  return console.log('Connected to the MySQL server.');
});

module.exports = connection;
