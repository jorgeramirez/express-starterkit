const User = require('@app/models/user');

async function create(user) {
  if (!user) {
    throw Error('user parameter required.');
  }

  if (!user.name || !user.email) {
    throw Error('An user should have a name and email.');
  }

  return User.create(user);
}

async function find(filters) {
  return User.find(filters);
}

module.exports = {
  create,
  find
};
