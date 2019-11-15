let users = [];

async function create(user) {
  users.push(user);
}

// eslint-disable-next-line no-unused-vars
async function find(filters) {
  return users;
}

module.exports = {
  create,
  find
};
