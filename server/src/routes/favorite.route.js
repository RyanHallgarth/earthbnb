const express = require('express');
const listingRouter = require('./listing.route');
const favoriteRouter = express.Router();
const ensureAuthenticated = require('../../middleware/auth.middleware');

//listingRouter.get('/', paginatedResults(), (req, res) => {});

listingRouter.get('/:id', ensureAuthenticated, (req, res) => {
  // Checks user favorite array and returns true if :id is found in the array
});

listingRouter.post('/:id', ensureAuthenticated, (req, res) => {
  console.log('Adding Id');
  // Checks user favorite arrar for id and add it if not
});

listingRouter.delete('/:id', ensureAuthenticated, (req, res) => {
  console.log('Deleting id');
  // checks user favorite array for id and deletes it if not there
});

module.exports = favoriteRouter;
