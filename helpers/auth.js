const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  next();
};

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect('/dashboard');
  next();
};

module.exports = {
  ensureAuthenticated,
  ensureGuest
};
