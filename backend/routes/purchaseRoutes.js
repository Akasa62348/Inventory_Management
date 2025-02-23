const express = require('express');
const { createPurchase, getPurchases, getPurchaseById } = require('../controllers/purchaseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPurchase);
router.get('/', protect, getPurchases);
router.get('/:id', protect, getPurchaseById); // ➡️ Added route to fetch purchase by ID

module.exports = router;
