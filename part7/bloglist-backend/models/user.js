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
      validator: async function validate(username) {
        const user = await mongoose.models.User.exists({ username }, { collation: { locale: 'en', strength: 2 } });
        if (!user || user._id.toString() === this._id.toString()) {
          return true;
        }
        return false;
      },
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
  blogs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Blog',
    required: true,
  },
  is_password_hashed: {
    type: Boolean,
    required: true,
    default: false,
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
  if (!doc.is_password_hashed) {
    doc.password = await doc.constructor.generatePasswordHash(doc.password);
    doc.is_password_hashed = true;
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject.password;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.is_password_hashed;
  },
});

module.exports = mongoose.model('User', userSchema);
