const express = require('express');
const oppejoudController = require('../controllers/oppejoudController');

const router = express.Router();

/**
 * Comments API endpoints
 */
router.get('/', oppejoudController.getOppejoud);
router.get('/:id', oppejoudController.getOpetajaById);
router.post('/', oppejoudController.createOpetaja);
router.delete('/:id', oppejoudController.deleteOpetaja);

module.exports = router;