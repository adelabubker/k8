// utils/validation.js — Validation utilities and schemas
const { body, validationResult } = require('express-validator');
const { ERRORS } = require('../constants');

/**
 * Express middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validation schemas
 */
const validationSchemas = {
  // Auth validators
  register: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required.')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters.'),
    body('email')
      .trim()
      .isEmail()
      .withMessage(ERRORS.VALIDATION_INVALID_EMAIL)
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters.')
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
      .withMessage('Password must contain both letters and numbers.'),
  ],

  login: [
    body('email')
      .trim()
      .isEmail()
      .withMessage(ERRORS.VALIDATION_INVALID_EMAIL)
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required.'),
  ],

  // Service validators
  createService: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Service title is required.')
      .isLength({ min: 3, max: 100 })
      .withMessage('Service title must be between 3 and 100 characters.'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required.')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters.'),
    body('category')
      .trim()
      .notEmpty()
      .withMessage('Category is required.'),
    body('location')
      .optional()
      .isIn(['home', 'services', 'hero', 'featured'])
      .withMessage('Invalid location.'),
    body('icon')
      .optional()
      .trim(),
  ],

  updateService: [
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Service title cannot be empty.')
      .isLength({ min: 3, max: 100 })
      .withMessage('Service title must be between 3 and 100 characters.'),
    body('description')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Description cannot be empty.')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters.'),
    body('category')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Category cannot be empty.'),
    body('location')
      .optional()
      .isIn(['home', 'services', 'hero', 'featured'])
      .withMessage('Invalid location.'),
    body('icon')
      .optional()
      .trim(),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean.'),
  ],

  // User validators
  updateRole: [
    body('role')
      .isIn(['user', 'admin', 'fullAdmin'])
      .withMessage('Invalid role. Must be: user, admin, or fullAdmin.'),
  ],
};

module.exports = {
  handleValidationErrors,
  validationSchemas,
};