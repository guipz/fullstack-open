const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('../models/user');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

const userExtractor = async (request, response, next) => {
  if (!request.decodedJWTBearerToken) {
    return response.status(401).json({ error: 'Authentication token not set' });
  }
  const user = await User.findById(request.decodedJWTBearerToken.id);
  if (!user) {
    return response.status(401).json({ error: 'User not found' });
  }
  request.user = user;
  return next();
};

const decodeJWTBearerToken = (request, response, next) => {
  const header = request.get('authorization');
  if (header) {
    const token = header.replace('Bearer ', '');
    request.decodedJWTBearerToken = jwt.verify(token, config.ENCRYPTION_SECRET);
  }
  return next();
};

const castErrorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed request' });
  }
  return next(error);
};

const validationErrorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: Object.values(error.errors).flatMap((e) => e.message).join(', ') });
  }
  return next(error);
};

const jwtTokenErrorHandler = (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Authentication Error' });
  }
  return next(error);
};

const jwtExpiredErrorHandler = (error, request, response, next) => {
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Authentication token is expired' });
  }
  return next(error);
};

const serverErrorHandler = (error, request, response) => response.status(500).send({ error: 'Server error' });

module.exports = {
  unknownEndpoint,
  castErrorHandler,
  decodeJWTBearerToken,
  jwtTokenErrorHandler,
  userExtractor,
  jwtExpiredErrorHandler,
  serverErrorHandler,
  validationErrorHandler,
};
