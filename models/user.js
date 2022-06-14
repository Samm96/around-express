const mongoose = require('mongoose');
const { linkRegex } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'The "name" field length is too short (min: 2)'],
    maxLength: [30,'The "name" field length is too long (max: 30)'],
    required: [true,'Required field'],
  },

  about: {
    type: String,
    minLength: [2, 'The "about" field length is too short (min: 2)'],
    maxLength: [30,'The "about" field length is too long (max: 30)'],
    required: [true,'Required field'],
  },

  avatar: {
    type: String,
    required: [true,'Required field'],
    validate: {
      validator: (v) => linkRegex.test(v),
      message: 'This is not a valid URL'
      },
    },
  });

module.exports = mongoose.model('user', userSchema);
