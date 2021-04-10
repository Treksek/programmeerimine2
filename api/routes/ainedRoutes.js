const express = require('express');
const ainedController = require('../controllers/ainedController');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

router.get('/', ainedController.getAined);
router.get('/:id', ainedController.getAineById);
router.post('/', isLoggedIn, ainedController.createAine);
router.patch('/:id', isLoggedIn, ainedController.changeAine);
router.delete('/:id', isLoggedIn, isAdmin, ainedController.deleteAine);

module.exports = router;