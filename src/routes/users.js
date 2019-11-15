const { Router } = require('express');

const UserService = require('@app/services/users');

const route = Router();

module.exports = async function(routes) {
  routes.use('/users', route);

  route.get('/', async (req, res) => {
    const filters = req.query;
    const users = await UserService.find(filters);
    res.status(200).json(users);
  });
};
