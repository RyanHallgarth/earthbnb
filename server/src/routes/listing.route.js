const express = require('express');
const {
  paginatedResults,
  selectListing,
} = require('../helpers/listings.helpers');

const listingRouter = express.Router();

listingRouter.get('/', paginatedResults(), (req, res) => {});

listingRouter.get('/:id', async (req, res) => {
  const listing = await selectListing(req.params.id, (listing) => {
    res.json(listing);
  });
});

module.exports = listingRouter;
