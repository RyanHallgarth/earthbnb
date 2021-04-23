require('dotenv').config();

const express = require('express');

const router = express.Router();
const passport = require('passport');

require('../../passport/passport_google');
const mongoose = require('mongoose');
require('../../models/User');

const User = mongoose.model('users');

/* GET users profile. */
router.get('/user', (req, res) => {
  // If a user is logged in provide their information
  if (req.isAuthenticated()) {
    const loggedInUser = req.user;
    User.findOne({
      _id: loggedInUser._id,
    }).then((user) => {
      res.json(user);
    });
  } else {
    res.status(404).json({ error: 'No user logged in' });
  }
});

/* GET to Google login screen. */
router.get(
  '/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/* GET to logout screen. */
router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) return next(err);
    res.json({ message: 'User has been successfully logged out.' });
  });
});

/* GET to Google return. */
router.get(
  '/return',
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.redirect('/');
    } else {
      res.redirect('http://localhost:3000/');
    }
  }
);

module.exports = router;
