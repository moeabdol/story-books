const mongoose = require('../config/mongoose');
const Schema   = mongoose.Schema;

const StorySchema = Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'public'
  },
  allowComments: {
    type: Boolean,
    required: true,
    default: true
  },
  comments: [{
    body: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    requierd: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Story', StorySchema);
