/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must provide an username'],
    minLength: [3, 'username must have length of at least 3'],
  },
  name: {
    type: String,
    required: [true, 'must provide a name'],
  },
  password: {
    type: String,
    required: [true, 'must provide a password'],
  },
}, {
  methods: {
    generateJWTToken() {
      return jwt.sign({ username: this.username, id: this._id }, config.ENCRYPTION_SECRET);
    },
  },
  statics: {
    async generatePasswordHash(val) {
      const saltRounds = 10;
      return bcrypt.hash(val, saltRounds);
    },
  },
});

userSchema.post('validate', async (doc) => {
  doc.password = doc.constructor.generatePasswordHash(doc.password);
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('User', userSchema);
