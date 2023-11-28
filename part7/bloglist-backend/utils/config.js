require('dotenv').config();

const IS_TEST = process.env.NODE_ENV === 'test';
const MONGODB_URI = IS_TEST ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
const { PORT, ENCRYPTION_SECRET } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
  ENCRYPTION_SECRET,
  IS_TEST,
};
