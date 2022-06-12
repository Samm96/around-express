const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },

  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
    pattern: /(^http|https)?:\/\/?(^www\.)?\S{1,}/,
  },
});

module.exports = mongoose.model('user', userSchema);
