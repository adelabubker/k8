// middleware/errorHandler.js — Centralized error handling middleware
const logger = require('../utils/logger');
const { ERRORS, HTTP_STATUS } = require('../constants');

/**
 * Central error handler middleware
 * Catches and formats errors from across the application
 * Logs errors appropriately based on severity
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_ERROR;
  let message = err.message || ERRORS.INTERNAL_SERVER_ERROR;
  let errors = null;

  // Log the error
  if (statusCode >= 500) {
    logger.error(`[${statusCode}] ${message}`, err);
  } else {
    logger.warn(`[${statusCode}] ${message}`);
  }

  // ─── Mongoose Duplicate Key Error ────────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `The ${field} "${err.keyValue[field]}" is already in use.`;
    statusCode = HTTP_STATUS.CONFLICT;
  }

  // ─── Mongoose Validation Error ───────────────────────────────────────────
  if (err.name === 'ValidationError') {
    const validationErrors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
    message = 'Validation failed. Please check the provided data.';
    statusCode = HTTP_STATUS.BAD_REQUEST;
    errors = validationErrors;
  }

  // ─── JWT Errors ──────────────────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    message = ERRORS.AUTH_INVALID_TOKEN;
    statusCode = HTTP_STATUS.UNAUTHORIZED;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token has expired. Please login again.';
    statusCode = HTTP_STATUS.UNAUTHORIZED;
  }

  // ─── MongoDB Cast Error ──────────────────────────────────────────────────
  if (err.name === 'CastError') {
    message = ERRORS.VALIDATION_INVALID_ID;
    statusCode = HTTP_STATUS.BAD_REQUEST;
  }

  // ─── Custom API Error ────────────────────────────────────────────────────
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // ─── Unexpected Error (Generic Response in Production) ──────────────────
  const response = {
    success: false,
    message: process.env.NODE_ENV === 'production' ? ERRORS.INTERNAL_SERVER_ERROR : message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.originalError = err.message;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
