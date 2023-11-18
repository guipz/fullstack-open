/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'must provide an username'],
    minLength: [3, 'username must have length of at least 3'],
    validate: {
      validator: (username) => mongoose.models.User.exists({ username }, { collation: { locale: 'en', strength: 2 } }).then((r) => !r),
      message: (props) => `the username ${props.value} is already in use`,
    },
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
    async isPasswordCorrect(val) {
      return bcrypt.compare(val, this.password);
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
  doc.password = await doc.constructor.generatePasswordHash(doc.password);
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
