const { Router } = require('express');
// This dependency allows us to avoid the UnhandledPromiseRejectionWarning
const asyncHandler = require('express-async-handler');

const UserService = require('@app/services/users');

const route = Router();

module.exports = async function(routes) {
  routes.use('/users', route);

  route.get(
    '/',
    // eslint-disable-next-line no-unused-vars
    asyncHandler(async (req, res, next) => {
      const filters = req.query;
      const users = await UserService.find(filters);
      res.status(200).json(users);
    })
  );

  route.post(
    '/',
    // eslint-disable-next-line no-unused-vars
    asyncHandler(async (req, res, next) => {
      const newUser = req.query;
      const user = await UserService.create(newUser);
      res.status(200).json(user);
    })
  );
};
