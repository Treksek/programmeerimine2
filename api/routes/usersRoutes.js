const express = require('express');
const { usersController } = require('../controllers');

const router = express.Router();
const { validators, isLoggedIn, isAdmin } = require('../middlewares');

/**
 * Users API endpoints
 */
/*router
  .post('/', usersController.createUser)
  .post('/login', usersController.login)
  .get('/', usersController.getUsers)
  .get('/:id', validators.getUserById, usersController.getUserById)
  .patch('/:id',  usersController.updateUser)
  .delete('/:id',  usersController.deleteUser);*/

  router
  .post('/', usersController.createUser)
  .post('/login', usersController.login)
  .get('/', isLoggedIn, isAdmin, usersController.getUsers)
  .get('/:id', validators.getUserById, usersController.getUserById)
  .patch('/:id', isLoggedIn, usersController.updateUser)
  .delete('/:id', isLoggedIn, isAdmin, usersController.deleteUser);

module.exports = router;