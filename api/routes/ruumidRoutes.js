const express = require('express');
const ruumidController = require('../controllers/ruumidController');
const { isLoggedIn, isAdmin, } = require('../middlewares');

const router = express.Router();


router.get('/', ruumidController.getRuumid);
router.get('/:id', ruumidController.getRuumById);
router.post('/',  ruumidController.createRuum);
router.patch('/:id',  ruumidController.changeRuum);
router.delete('/:id', isAdmin, ruumidController.deleteRuum);

module.exports = router;