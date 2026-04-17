const express = require('express');
const router = express.Router();
const budgetCtrl = require('../controllers/budget');
const auth = require('../middleware/auth');

router.get('/', budgetCtrl.displayBudgets);
router.get('/:id', budgetCtrl.getThisBudget);

router.post('/', auth, budgetCtrl.createBudget);

router.put('/:id', auth, budgetCtrl.classifyBudget);


module.exports = router;