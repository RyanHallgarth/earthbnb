const express = require('express');
const welcomeMessage = require('../settings');
const { paginatedResults } = require('../helpers/listings.helpers');

const serverRouter = express.Router();

serverRouter.get('/', (req, res) => {
  res.status(200).json({ message: welcomeMessage });
});

serverRouter.get('/listings', paginatedResults(), (req, res) => {
  res.json(res.paginatedResults);
});

module.exports = serverRouter;
