const express = require('express');
const welcomeMessage = require('../settings');
const { paginatedResults } = require('../helpers/listings.helpers');

const serverRouter = express.Router();

serverRouter.get('/', (req, res) => {
  res.status(200).json({ message: welcomeMessage });
});

serverRouter.get('/listings', paginatedResults(), (req, res) => {
  res.json({
    content: res.paginatedResults[1],
    page: req.query.page,
    results_per_page: req.query.limit,
    total_results: res.paginatedResults[0], // TODO this needs to be actually calculated from the DB
  });
});

module.exports = serverRouter;
