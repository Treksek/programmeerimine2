const express = require('express');
const kursusedController = require('../controllers/kursusedController');

const router = express.Router();

/**
 * Comments API endpoints
 */
router.get('/', kursusedController.getKursused);
router.get('/:id', kursusedController.getKursusById);
router.post('/', kursusedController.createKursus);
router.patch('/:id', kursusedController.changeKursus);
router.delete('/:id', kursusedController.deleteKursus);


module.exports = router;