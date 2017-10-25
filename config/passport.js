const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User           = require('../models/user');

module.exports = function(passport) {
  passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    const image = profile.photos[0].value.substring(0,
      profile.photos[0].value.indexOf('?'));

    User.findOne({ googleID: profile.id })
      .then(user => {
        if (!user) {
          User.create({
            googleID: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: image
          }).then(user => {
            return done(null, user);
          }).catch(err => done(err));
        }
        done(null, user);
      })
      .catch(err => done(err));
  }));
};
