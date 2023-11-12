/* eslint-disable no-underscore-dangle */

const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const newUser = new User(request.body);
  await newUser.save();
  response.json({
    ...newUser.toJSON(),
    token: newUser.generateJWTToken(),
  });
});

module.exports = usersRouter;
