const express = require('express');
const {
  paginatedResults,
  selectListing,
  selectTopListings,
} = require('../helpers/listings.helpers');

const listingRouter = express.Router();

listingRouter.get('/', paginatedResults(), (req, res) => {});

listingRouter.get('/listing/:id', async (req, res) => {
  const listing = await selectListing(req.params.id, (listing) => {
    res.json(listing);
  });
});

listingRouter.get('/toprated', async (req, res) => {
  const limit = req.query.limit || 10;
  const topListings = await selectTopListings(limit, (listings) => {
    res.json(listings);
  });
});

module.exports = listingRouter;
