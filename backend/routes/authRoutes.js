// routes/authRoutes.js — Authentication routes with validation
const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validationSchemas, handleValidationErrors } = require('../utils/validation');

/**
 * @route   POST /api/auth/register
 * @access  Public
 */
router.post('/register', validationSchemas.register, handleValidationErrors, register);

/**
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post('/login', validationSchemas.login, handleValidationErrors, login);

/**
 * @route   POST /api/auth/logout
 * @access  Private
 */
router.post('/logout', protect, logout);

/**
 * @route   GET /api/auth/me
 * @access  Private
 */
router.get('/me', protect, getMe);

module.exports = router;
