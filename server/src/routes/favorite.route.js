const express = require('express');
const listingRouter = require('./listing.route');
const favoriteRouter = express.Router();

//listingRouter.get('/', paginatedResults(), (req, res) => {});

listingRouter.post('/login?:id', (req, res) => {
  console.log('work in progress');
});

module.exports = favoriteRouter;
