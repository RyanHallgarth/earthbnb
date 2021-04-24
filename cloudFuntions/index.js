/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
require("dotenv").config();
const mysql = require("mysql");

// Database Connection for Production

const connection = mysql.createConnection({
  multipleStatements: true,
  host: process.env.DB_ADDRESS,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  return console.log("Connected to the MySQL server.");
});

exports.increaseOrDecrease = (req, res) => {
  if (req.query.operation === "inc") {
    // increase the count
    increaseCurrentCount(req.query.id);
    res.send(200);
  } else {
    // decrease the count
    decreaseCurrentCount(req.query.id);
    res.send(200);
  }
  connection.end();
};

const increaseCurrentCount = async (listingId) => {
  connection.query(
    `
      UPDATE listings 
      SET number_of_reviews=number_of_reviews+1 
      WHERE id=${listingId};
      `
  );
};

const decreaseCurrentCount = async (listingId) => {
  connection.query(
    `
          UPDATE listings 
          SET number_of_reviews=number_of_reviews-1 
          WHERE id=${listingId};
          `
  );
};
