/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'must provide an creator'],
  },
  content: {
    type: String,
    minLength: [3, 'content must have length of at least 3'],
    required: [true, 'must provide a content'],
  },
});

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
