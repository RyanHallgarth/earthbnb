const express = require('express');
const welcomeMessage = require('../settings');
const { paginatedResults } = require('../helpers/listings.helpers');

const listingRouter = express.Router();

listingRouter.get('/', (req, res) => {
  res.status(200).json({ message: welcomeMessage });
});

listingRouter.get('/listings', paginatedResults(), (req, res) => {});

module.exports = listingRouter;
