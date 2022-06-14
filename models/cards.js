const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Required field'],
    minLength: [2, 'The "name" field length is too short (min: 2)'],
    maxLength: [30,'The "name" field length is too long (max: 30)'],
  },

  link: {
    type: String,
    required: [true, 'Required field'],
    validate: {
      validator: (v) => {
        return /(^http|https)?:\/\/?(^www\.)?\S{1,}\.[a-z]{3}?\/\S{1,}/.test(v);
      },
      message: 'This is not a valid URL'
    }
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
