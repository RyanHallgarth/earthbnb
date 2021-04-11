const express = require('express');
const welcomeMessage = require('../settings');

const serverRouter = express.Router();

serverRouter.get('/', (req, res) => {
  res.status(200).json({ message: welcomeMessage });
});

serverRouter.get('/listings', paginatedResults(), (req, res) => {
  res.json(res.paginatedResults);
})

const paginatedResults = () => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const sortBy = req.query.sort_by || 'title';
    const order = req.query.order || 'asc';
    const results = {};

    try {
      results.results = await selectListings((page, limit, skipIndex, sortBy, order, listings) => {
        res.json({listings});
      });
    } catch (error) {
      
    }
  }
} 

const selectListings = async (page, limit, skipIndex, sortBy, order, callback) => {
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

module.exports = serverRouter;
