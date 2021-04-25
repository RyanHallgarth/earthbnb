const express = require('express');
const {
  paginatedResults,
  selectListing,
  selectTopListings,
  selectUniqueListings,
  selectEntirePlaceListings,
  selectListingamenities,
} = require('../helpers/listings.helpers');

const listingRouter = express.Router();

listingRouter.get('/', paginatedResults(), (req, res) => {});

listingRouter.get('/listing/:id', async (req, res) => {
  const listing = await selectListing(req.params.id, (listing) => {
    res.json(listing);
  });
});

listingRouter.get('/listing/amenities/:id', async (req, res) => {
  const listing = await selectListingamenities(req.params.id, (listing) => {
    res.json(listing);
  });
});

listingRouter.get('/toprated', async (req, res) => {
  const limit = req.query.limit || 10;
  const topListings = await selectTopListings(limit, (listings) => {
    res.json(listings);
  });
});

listingRouter.get('/uniquestays', async (req, res) => {
  const limit = req.query.limit || 10;
  const uniqueListings = await selectUniqueListings(limit, (listings) => {
    res.json(listings);
  });
});

listingRouter.get('/entireplace', async (req, res) => {
  const limit = req.query.limit || 10;
  const accomodates = req.query.accomodates || 5;
  const uniqueListings = await selectEntirePlaceListings(
    limit,
    accomodates,
    (listings) => {
      res.json(listings);
    }
  );
});

module.exports = listingRouter;
