require('dotenv').config();

const express = require('express');

const router = express.Router();
const passport = require('passport');

require('../../passport/passport_google');

// /* GET users profile. */
// router.get('/', (req, res) => {
//   // If a user is logged in show their page
//   if (req.isAuthenticated()) {
//     const loggedInUser = req.user;
//     Donation.find({ creator_id: req.user.providerID })
//       .sort({ date: 'desc' })
//       .then((donations) => {
//         Camp.find({ creator_id: req.user.providerID })
//           .sort({ date: 'desc' })
//           .then((campaigns) => {
//             res.render('users/user-profile', {
//               displayName: loggedInUser.displayName,
//               email: loggedInUser.email,
//               userImage: loggedInUser.picture,
//               donationList: donations,
//               camplist: campaigns,
//               isAuthenticated: req.isAuthenticated(),
//             });
//           });
//       });
//   } else {
//     res.render('users/user-noprofile');
//   }
// });

/* GET to Google login screen. */
router.get(
  '/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
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
    res.json(req.user);
  },
);

module.exports = router;