const User = require('../models/user');

const initialUsers = [
  {
    username: 'Alice',
    name: 'Alice Johnson',
    password: '1234567abc',
  },
  {
    username: 'Charlie',
    name: 'Charlie Brown',
    password: 'qwerty789',
  },
  {
    username: 'David',
    name: 'David Smith',
    password: 'password123',
  },
];

const usersInDB = async () => User.find({});

const testUsersSetup = async () => {
  await User.deleteMany({});
  const promisesArray = initialUsers.map((u) => new User(u).save());
  await Promise.all(promisesArray);
};

const getRandomUserCreationData = () => {
  const randIdx = Math.floor(Math.random() * initialUsers.length);
  return initialUsers[randIdx];
};

const getLengthInitialUsersAdded = () => initialUsers.length;

const getRandomUserDocument = async () => User.findOne({});

const getRandomUserToken = async () => (await getRandomUserDocument()).generateJWTToken();

const getUserWithId = async (id) => User.findById(id);

// eslint-disable-next-line no-underscore-dangle
const getRandomUserId = async () => String((await User.findOne({}))._id);

module.exports = {
  initialUsers,
  usersInDB,
  getUserWithId,
  getRandomUserCreationData,
  getLengthInitialUsersAdded,
  getRandomUserToken,
  getRandomUserDocument,
  getRandomUserId,
  testUsersSetup,
};
