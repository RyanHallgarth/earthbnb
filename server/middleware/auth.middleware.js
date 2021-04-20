// Middleware to report authentication status
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Authentication
    next();
  } else {
    res.redirect('/api/auth/login');
  }
};

exports.ensureAuthenticated = ensureAuthenticated;
