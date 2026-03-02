// middleware/auth.js — JWT + role-based access control middleware
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');
const { ERRORS, HTTP_STATUS, ROLES } = require('../constants');

/**
 * Protect routes: verify JWT token from Authorization header
 * Validates token signature and checks if token exists in DB for logout invalidation
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Extract token from Authorization header (Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token is present
    if (!token) {
      logger.warn('Attempt to access protected route without token');
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERRORS.AUTH_NO_TOKEN,
      });
    }

    try {
      // Verify JWT signature
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user and verify token matches stored token (enables logout invalidation)
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        logger.warn(`User not found for token: ${decoded.id}`);
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: ERRORS.AUTH_USER_NOT_FOUND,
        });
      }

      if (user.token !== token) {
        logger.warn(`Token mismatch for user: ${user._id}`);
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: ERRORS.AUTH_INVALID_TOKEN,
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      logger.debug('JWT verification error', jwtError.message);
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERRORS.AUTH_INVALID_TOKEN,
      });
    }
  } catch (error) {
    logger.error('Auth middleware error', error);
    return res.status(HTTP_STATUS.INTERNAL_ERROR).json({
      success: false,
      message: ERRORS.INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Role-based access control middleware
 * Restricts route access to users with specific roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERRORS.AUTH_NO_TOKEN,
      });
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(`User ${req.user._id} attempted unauthorized access. Required roles: ${roles.join(', ')}, User role: ${req.user.role}`);
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: ERRORS.USER_UNAUTHORIZED,
      });
    }

    next();
  };
};

// ─── Convenience Middleware ──────────────────────────────────────────────────
/**
 * Combined middleware for admin-only routes (admin or fullAdmin)
 */
const adminOnly = [protect, authorize(ROLES.ADMIN, ROLES.FULL_ADMIN)];

/**
 * Combined middleware for fullAdmin-only routes
 */
const fullAdminOnly = [protect, authorize(ROLES.FULL_ADMIN)];

module.exports = {
  protect,
  authorize,
  adminOnly,
  fullAdminOnly,
};
