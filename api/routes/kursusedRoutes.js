const express = require('express');
const kursusedController = require('../controllers/kursusedController');
const { isLoggedIn, isAdmin, } = require('../middlewares');

const router = express.Router();


router.get('/', kursusedController.getKursused);
router.get('/:id',  kursusedController.getKursusById);
router.post('/',  kursusedController.createKursus);
router.patch('/:id', isLoggedIn, kursusedController.changeKursus);
router.delete('/:id', isLoggedIn, isAdmin, kursusedController.deleteKursus);


module.exports = router;
