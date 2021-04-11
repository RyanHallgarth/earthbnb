const connection = require("../../services/db.config");

// Connect to MySQL DB and get listings accoriding to the query params.
const selectListings = async (
  limit,
  skipIndex,
  sortBy,
  order,
  callback
) => {
  // TODO Create the actual connection to mysql DB
  connection.query(
    'SELECT COUNT * FROM listings; SELECT * FROM listings ORDER BY ?? ?? LIMIT ?? OFFSET ??', [sortBy, order, limit, skipIndex],
    (error, results) => {
      if (error) throw error;
      callback(results);
    }
  );
};

// Package paginated results as a JSON object
const paginatedResults = () => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const sortBy = req.query.sort_by || 'title';
    const order = req.query.order || 'ASC';
    order.toUpperCase();
    const results = {};
    if(!page){
        res.status(422).json({"error": "Must include page number"});
    } else if (!limit){
        res.status(422).json({"error": "Must include limit number between 1-100"});
    } else if (limit < 1){
        res.status(422).json({"error": "Limit must be greater than 0"});
    } else if (limit > 100){
        res.status(422).json({"error": "Limit must be less than or equal to 100"});
    } else if (page < 1){
        res.status(422).json({"error": "Page must be greater than 0"});
    } else if (order != 'ASC' && order != 'DESC'){
        res.status(422).json({"error": "Order may only be asc|desc"});
    } else {
        try {
            results.results = await selectListings(
                limit, skipIndex, sortBy, order, (listings) => {
                // TODO add current page, or last page and previous page info to JSON before sending
                    res.json({ listings });
                }
            );
        } catch (error) {}
    }
  };
};

exports.paginatedResults = paginatedResults;
