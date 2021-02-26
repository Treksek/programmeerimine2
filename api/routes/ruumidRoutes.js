const express = require('express');
const ruumidController = require('../controllers/ruumidController');

const router = express.Router();

/**
 * Comments API endpoints
 */
router.get('/', ruumidController.getRuumid);
router.get('/:id', ruumidController.getRuumById);
router.post('/', ruumidController.createRuum);
router.delete('/:id', ruumidController.deleteRuum);

module.exports = router;