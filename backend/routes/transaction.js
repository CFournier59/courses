const express = require('express');
const router = express.Router();
const transactionCtrl = require('../controllers/transaction');
const auth = require('../middleware/auth');

router.get('/:id', transactionCtrl.displayTransactions);
router.get('/:id', transactionCtrl.getThisTransaction);



router.post('/', auth, transactionCtrl.createTransaction);
router.delete('/:id', auth, transactionCtrl.deleteTransaction);


module.exports = router;