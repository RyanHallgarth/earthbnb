const express = require('express');
const favoriteRouter = express.Router();
//const ensureAuthenticated = require('../../middleware/auth.middleware');
const mongoose = require('mongoose');
const listingRouter = require('./listing.route');
require('../../models/User');

const User = mongoose.model('users');

//favoriteRouter.get('/', paginatedResults(), (req, res) => {});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Authentication
    next();
  } else {
    res.redirect('/api/auth/login');
  }
};

favoriteRouter.get('/:listingID', ensureAuthenticated, (req, res) => {
  // Checks user favorite array and returns true if :id is found in the array
  User.findOne({
    _id: req.user._id,
  })
    .then((user) => {
      if (user.favorites.find((el) => el === req.params.listingID)) {
        res.send('true');
      } else {
        res.status(404).send('false');
      }
    })
    .catch((err) => {
      res.status(404).json({ message: 'No user logged in' });
    });
});

favoriteRouter.post('/:listingID', ensureAuthenticated, (req, res) => {
  // Checks user favorite array for id and add it if not
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { $push: { favorites: req.params.listingID } }
  )
    .then(() => {
      res
        .status(200)
        .json({ message: `${req.params.listingID} Added to user favorites` });
    })
    .then(() => {
      fetch(
        `https://us-central1-cit41200-u4-earthbnb.cloudfunctions.net/favorites?operation=inc&id=${req.params.listingID}`
      );
    })
    .catch((err) => {
      res.status(404).json({ message: 'No user logged in' });
    });
});

favoriteRouter.delete('/:listingID', ensureAuthenticated, (req, res) => {
  // checks user favorite array for id and deletes it if not there
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { $pullAll: { favorites: req.params.listingID } }
  )
    .then(() => {
      res.status(200).json({
        message: `${req.params.listingID} Deleted from user favorites`,
      });
    })
    .then(() => {
      fetch(
        `https://us-central1-cit41200-u4-earthbnb.cloudfunctions.net/favorites?operation=dec&id=${req.params.listingID}`
      );
    })
    .catch((err) => {
      res.status(404).json({ message: 'No user logged in' });
    });
});

module.exports = favoriteRouter;
