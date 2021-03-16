const express = require('express');
const ainedController = require('../controllers/ainedController');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

router.get('/', ainedController.getAined);
router.get('/:id', ainedController.getAineById);
router.post('/', ainedController.createAine);
router.patch('/:id', ainedController.changeAine);
router.delete('/:id', isAdmin, ainedController.deleteAine);

module.exports = router;