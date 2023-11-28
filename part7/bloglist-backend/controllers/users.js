/* eslint-disable no-underscore-dangle */

const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  return response.json(users);
});

usersRouter.get('/:id', async ({ params }, response) => {
  const user = await User.findById(params.id);
  if (!user) {
    response.status(404).json({ error: 'User not found' });
  } else {
    await user.populate('blogs');
    response.json(user);
  }
});

usersRouter.post('/', async (request, response) => {
  const newUser = new User(request.body);
  await newUser.save();
  response.json({
    ...newUser.toJSON(),
    token: newUser.generateJWTToken(),
  });
});

usersRouter.post('/login', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  if (!user) {
    response.status(404).json({ error: 'User not found' });
  } else if (!(await user.isPasswordCorrect(password))) {
    response.status(401).json({ error: 'Incorrect Password' });
  } else {
    response.json({ ...user.toJSON(), token: user.generateJWTToken() });
  }
});

module.exports = usersRouter;
