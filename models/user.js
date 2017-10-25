const mongoose = require('../config/mongoose');

const UserSchema = new mongoose.Schema({
  googleID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
