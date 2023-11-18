require('express-async-errors');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleWare = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const testingRouter = require('./controllers/testing');

const app = express();

mongoose.set('strictQuery', false);

logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`error connecting to MongoDB: ${error.message}`);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(middleWare.decodeJWTBearerToken);

if (config.IS_TEST) {
  app.use('/api/testing', testingRouter);
}

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleWare.unknownEndpoint);
app.use(middleWare.castErrorHandler);
app.use(middleWare.validationErrorHandler);
app.use(middleWare.jwtExpiredErrorHandler);
app.use(middleWare.jwtTokenErrorHandler);
app.use(middleWare.serverErrorHandler);

module.exports = app;
