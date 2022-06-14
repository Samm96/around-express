const mongoose = require('mongoose');

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
      validator: (v) => {
        return /(^http|https)?:\/\/?(^www\.)?\S{1,}\.[a-z]{3}?\/\S{1,}/.test(v);
      },
      message: 'This is not a valid URL'
    },
  },
});

module.exports = mongoose.model('user', userSchema);
