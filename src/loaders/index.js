const Logger = require('./logger');
const expressLoader = require('./express');

module.exports = async function(app) {
  await expressLoader(app);
  Logger.info('Express loaded');
};
