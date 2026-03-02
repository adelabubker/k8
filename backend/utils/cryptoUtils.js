const crypto = require('crypto');
const logger = require('./logger');

const algorithm = 'aes-256-cbc';

/**
 * Encrypt a string
 * @param {string} text - Plain text to encrypt
 * @returns {string} - Encrypted text in format iv:content
 */
const encrypt = (text) => {
  try {
    const key = process.env.ENCRYPTION_KEY;
    if (!key || key.length !== 64) {
      throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    logger.error('Encryption failed', error);
    throw error;
  }
};

/**
 * Decrypt a string
 * @param {string} text - Encrypted text in format iv:content
 * @returns {string} - Decrypted plain text
 */
const decrypt = (text) => {
  try {
    const key = process.env.ENCRYPTION_KEY;
    if (!key || key.length !== 64) {
      throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
    }

    const [ivHex, encryptedText] = text.split(':');
    if (!ivHex || !encryptedText) {
      throw new Error('Invalid encrypted text format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    logger.error('Decryption failed', error);
    throw error;
  }
};

module.exports = {
  encrypt,
  decrypt,
};
