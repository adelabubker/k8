// routes/userRoutes.js — User management routes (FullAdmin only)
const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, deleteUser, changeRole } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All user management routes require fullAdmin
router.use(protect, authorize('fullAdmin'));

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id/role', changeRole);

module.exports = router;
