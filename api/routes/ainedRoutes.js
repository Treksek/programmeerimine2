const express = require('express');
const ainedController = require('../controllers/ainedController');

const router = express.Router();

/**
 * Comments API endpoints
 */
router.get('/', ainedController.getAined);
router.get('/:id', ainedController.getAineById);
router.post('/', ainedController.createAine);
router.delete('/:id', ainedController.deleteAine);

module.exports = router;