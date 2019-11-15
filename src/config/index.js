const path = require('path');
const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

const result = dotenv.config({ path: path.resolve(process.cwd(), envFile) });

if (result.error) {
  // This error should crash whole process
  throw result.error;
}

module.exports = {
  port: process.env.PORT || 3000,

  /**
   * API configs
   */
  api: {
    prefix: '/api'
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  }
};
