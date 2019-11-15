const path = require('path');
const dotenv = require('dotenv');

const envFound = dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env.test file  ⚠️");
}

module.exports = {
  verbose: true,
  // A set of global variables that need to be available in all test environments
  globals: {
    __base: __dirname + '/src/'
  },
  collectCoverageFrom: ['src/**/*.js'],

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: './jest/setup.js',

  // A path to a module which exports an async function that is triggered once after all test suites
  globalTeardown: './jest/teardown.js'
};
