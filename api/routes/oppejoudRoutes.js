const express = require('express');
const oppejoudController = require('../controllers/oppejoudController');
const { isLoggedIn, isAdmin, } = require('../middlewares');

const router = express.Router();


router.get('/', oppejoudController.getOppejoud);
router.get('/:id', oppejoudController.getOpetajaById);
router.post('/',  oppejoudController.createOpetaja);
router.patch('/:id',  oppejoudController.changeOpetaja);
router.delete('/:id', isAdmin, oppejoudController.deleteOpetaja);

module.exports = router;