const express = require('express');
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getProducts);               // Get all products
router.get('/:id', protect, getProductById);         // ✅ Get single product by ID (new route)
router.post('/', protect, adminOnly, addProduct);    // Add product
router.put('/:id', protect, adminOnly, updateProduct); // Update product
router.delete('/:id', protect, adminOnly, deleteProduct); // Delete product

module.exports = router;
