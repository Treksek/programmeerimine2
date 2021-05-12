const express = require('express');
const oppejoudController = require('../controllers/oppejoudController');
const { isLoggedIn, isAdmin, } = require('../middlewares');

const router = express.Router();


router.get('/', oppejoudController.getOppejoud);
router.get('/:id', oppejoudController.getOpetajaById);
router.post('/',  oppejoudController.createOpetaja);
router.patch('/:id', isLoggedIn, oppejoudController.changeOpetaja);
router.delete('/:id', isLoggedIn,isAdmin, oppejoudController.deleteOpetaja);

module.exports = router;
