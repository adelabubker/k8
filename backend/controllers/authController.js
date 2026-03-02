// controllers/authController.js — Authentication: register, login, logout
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const logger = require('../utils/logger');
const { SUCCESS, ERRORS, HTTP_STATUS, ROLES } = require('../constants');

/**
 * @route   POST /api/auth/register
 * @access  Public
 * @desc    Register a new user
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERRORS.AUTH_MISSING_FIELDS,
      });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Registration attempt with existing email: ${email}`);
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: ERRORS.AUTH_EMAIL_EXISTS,
      });
    }

    // Create user (password auto-hashed via pre-save hook)
    const user = await User.create({ name, email, password });

    // Generate JWT and store in DB
    const token = generateToken(user._id);
    user.token = token;
    await user.save({ validateBeforeSave: false });

    logger.info(`New user registered: ${email}`);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: SUCCESS.AUTH_REGISTER,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    logger.error('Error in register controller', error);
    next(error);
  }
};

/**
 * @route   POST /api/auth/login
 * @access  Public
 * @desc    Login existing user and return JWT token
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERRORS.AUTH_MISSING_FIELDS,
      });
    }

    // Find user with password field (normally excluded)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERRORS.AUTH_INVALID_CREDENTIALS,
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn(`Login attempt with incorrect password for: ${email}`);
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERRORS.AUTH_INVALID_CREDENTIALS,
      });
    }

    // Generate new JWT and update in DB
    const token = generateToken(user._id);
    user.token = token;
    await user.save({ validateBeforeSave: false });

    logger.info(`User logged in: ${email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS.AUTH_LOGIN,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    logger.error('Error in login controller', error);
    next(error);
  }
};

/**
 * @route   POST /api/auth/logout
 * @access  Private
 * @desc    Logout user by clearing token from database
 */
const logout = async (req, res, next) => {
  try {
    // Clear token from DB — invalidates the session
    req.user.token = null;
    await req.user.save({ validateBeforeSave: false });

    logger.info(`User logged out: ${req.user.email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS.AUTH_LOGOUT,
    });
  } catch (error) {
    logger.error('Error in logout controller', error);
    next(error);
  }
};

/**
 * @route   GET /api/auth/me
 * @access  Private
 * @desc    Get current logged-in user information
 */
const getMe = async (req, res, next) => {
  try {
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  } catch (error) {
    logger.error('Error in getMe controller', error);
    next(error);
  }
};

module.exports = { register, login, logout, getMe };
