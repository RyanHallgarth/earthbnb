require("dotenv").config();
const connection = require("./db.config");

exports.increaseOrDecrease = (req, res) => {
  // Database Connection for Production
  console.log("------START OF FUNCTION------");

  if (req.query.operation === "inc") {
    // increase the count
    increaseCurrentCount(req.query.id);
    res.sendStatus(200);
  } else {
    // decrease the count
    decreaseCurrentCount(req.query.id);
    res.sendStatus(200);
  }
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
