const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const optimize = require('../middleware/file-opt');

router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBestBooks);
router.get('/:id', bookCtrl.getThisBook);

router.post('/:id/rating', auth, bookCtrl.rateBook);

router.post('/', auth, multer, optimize, bookCtrl.createBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.put('/:id', auth, multer, optimize, bookCtrl.modifyBook);


module.exports = router;