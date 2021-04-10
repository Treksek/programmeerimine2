const express = require('express');
const ruumidController = require('../controllers/ruumidController');
const { isLoggedIn, isAdmin, } = require('../middlewares');

const router = express.Router();


router.get('/', ruumidController.getRuumid);
router.get('/:id', ruumidController.getRuumById);
router.post('/', isLoggedIn, ruumidController.createRuum);
router.patch('/:id', isLoggedIn, ruumidController.changeRuum);
router.delete('/:id', isLoggedIn, isAdmin, ruumidController.deleteRuum);

module.exports = router;