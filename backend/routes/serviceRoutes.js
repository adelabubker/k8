// routes/serviceRoutes.js — Services CRUD routes
const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllServices);
router.get('/:id', getService);

// Admin routes
router.post('/', protect, authorize('admin', 'fullAdmin'), createService);
router.put('/:id', protect, authorize('admin', 'fullAdmin'), updateService);

// Full Admin only
router.delete('/:id', protect, authorize('fullAdmin'), deleteService);

module.exports = router;