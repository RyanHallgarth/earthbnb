const express = require('express');

const router = express.Router();
const passport = require('passport');

router.post('/register_login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: 'No user found' });
    }
    req.logIn(user, (logInErr) => {
      if (logInErr) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ success: `logged in ${user.id}` });
    });
    return 0;
  })(req, res, next);
});

module.exports = router;
