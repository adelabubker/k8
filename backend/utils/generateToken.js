// utils/generateToken.js — JWT token generation utility
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const { JWT_EXPIRATION } = require('../constants');

/**
 * Generate a signed JWT token for a user
 * @param {string} userId - The user's MongoDB ObjectId
 * @returns {string} - JWT token
 * @throws {Error} - If JWT_SECRET is not set or token generation fails
 */
const generateToken = (userId) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    if (!userId) {
      throw new Error('User ID is required to generate token');
    }

    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE || JWT_EXPIRATION,
        issuer: 'k8-automation',
        audience: 'k8-automation-users',
      }
    );

    logger.debug('JWT token generated successfully');
    return token;
  } catch (error) {
    logger.error('Failed to generate JWT token', error);
    throw error;
  }
};

module.exports = generateToken;
