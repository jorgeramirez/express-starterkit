/**
 * Main entry point of our application. This module returns a function that allow us to obtain
 * a fully-configured instance of our application.
 */
const express = require('express');

const loaders = require('./loaders');

module.exports = async function() {
  const app = express();
  await loaders(app);
  return app;
};
