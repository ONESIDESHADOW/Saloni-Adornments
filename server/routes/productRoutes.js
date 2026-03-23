const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, protectAdmin } = require('../middleware/authMiddleware');

// Get all products
router.get('/', async (req, res) => {
  const { category, search, page = 1, limit = 12 } = req.query;
  let query = {};
  
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  
  const products = await Product.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  res.json(products);
});

// Get single product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Create product (Admin only)
router.post('/', protect, protectAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', protect, protectAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', protect, protectAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload product image
router.post('/upload', protect, protectAdmin, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;