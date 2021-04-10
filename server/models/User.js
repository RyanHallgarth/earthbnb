const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create schema
const UserSchema = new Schema({
  provider: {
    type: String,
  },
  providerID: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  picture: {
    type: String,
  },
  providerProfile: {
    type: {},
  },
});

module.exports = mongoose.model('users', UserSchema);