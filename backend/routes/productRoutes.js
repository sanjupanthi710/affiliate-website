const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  getAllProductsAdmin,
  getProductByIdAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  recordClickAndRedirectInfo
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getProducts);
router.get('/slug/:slug', getProductBySlug);
router.post('/:id/click', recordClickAndRedirectInfo);

// Admin
router.get('/admin/all', protect, getAllProductsAdmin);
router.get('/id/:id', protect, getProductByIdAdmin);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
