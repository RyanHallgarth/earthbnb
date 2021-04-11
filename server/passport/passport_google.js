/* eslint-disable no-console */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');

require('../models/User');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) => {
      // Check to see if we need to wrie the user to the database

      // Create a user object
      const newUser = {
        providerID: profile.id,
        provider: profile.provider,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        providerProfile: profile,
      };

      // Check for existing user
      User.findOne({
        providerID: profile.id,
        // eslint-disable-next-line consistent-return
      }).then((user) => {
        if (user) {
          console.log('A user is found in the database!');
          return cb(null, user);
        }
        // eslint-disable-next-line no-shadow
        new User(newUser).save().then((user) => {
          return cb(null, user);
        });
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
