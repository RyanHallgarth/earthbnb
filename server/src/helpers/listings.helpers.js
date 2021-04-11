// Connect to MySQL DB and get listings accoriding to the query params.
const selectListings = async (
  page,
  limit,
  skipIndex,
  sortBy,
  order,
  callback
) => {
  // TODO Create the actual connection to mysql DB
  connection.query(
    ` SELECT * 
    FROM listings 
    ORDER BY ${sortBy} ${order}
    LIMIT ${limit}
    OFFSET ${skipIndex};
    `,
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
    const order = req.query.order || 'asc';
    const results = {};

    try {
      results.results = await selectListings(
        (page, limit, skipIndex, sortBy, order, listings) => {
          // TODO add current page, or last page and previous page info to JSON before sending
          res.json({ listings });
        }
      );
    } catch (error) {}
  };
};

exports.paginatedResults = paginatedResults;
