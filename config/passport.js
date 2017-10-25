const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose       = require('./mongoose');

module.exports = function(passport) {
  passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
    done();
  }));
};
