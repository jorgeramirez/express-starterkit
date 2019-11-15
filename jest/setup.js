module.exports = async function() {
  //We need the following line, if we want to use the __base for relative imports here.
  global.__base = __dirname + '/../src/';

  // put your code here
};
