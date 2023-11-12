/* eslint-disable no-console */
const config = require('./config');

function info(...params) {
  if (!config.IS_TEST) {
    console.log(...params);
  }
}

function error(...params) {
  if (!config.IS_TEST) {
    console.error(...params);
  }
}

module.exports = {
  info,
  error,
};
