const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide a title'],
  },
  author: {
    type: String,
    required: [true, 'must provide an author'],
  },
  url: {
    type: String,
    required: [true, 'must provide an url'],
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'must provide an user'],
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    required: true,
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    returnedObject.id = returnedObject._id;
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
