// constants/index.js — Centralized constants and enumerations
module.exports = {
  // ── Role enumeration
  ROLES: {
    USER: 'user',
    ADMIN: 'admin',
    FULL_ADMIN: 'fullAdmin',
  },

  // ── Error messages
  ERRORS: {
    // Auth errors
    AUTH_MISSING_FIELDS: 'Please provide all required fields.',
    AUTH_INVALID_CREDENTIALS: 'Invalid email or password.',
    AUTH_EMAIL_EXISTS: 'Email already registered.',
    AUTH_PASSWORD_WEAK: 'Password must be at least 6 characters.',
    AUTH_NO_TOKEN: 'Access denied. No token provided.',
    AUTH_INVALID_TOKEN: 'Invalid or expired token.',
    AUTH_USER_NOT_FOUND: 'User not found.',

    // Validation errors
    VALIDATION_INVALID_EMAIL: 'Please enter a valid email address.',
    VALIDATION_INVALID_ID: 'Invalid resource ID.',

    // Service errors
    SERVICE_NOT_FOUND: 'Service not found.',
    SERVICE_DELETE_FORBIDDEN: 'Only full admin can delete services.',

    // User errors
    USER_NOT_FOUND: 'User not found.',
    USER_UNAUTHORIZED: 'You do not have permission to access this resource.',

    // General errors
    INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',
    NOT_FOUND: 'Resource not found.',
  },

  // ── Success messages
  SUCCESS: {
    AUTH_REGISTER: 'Account created successfully.',
    AUTH_LOGIN: 'Login successful.',
    AUTH_LOGOUT: 'Logged out successfully.',
    SERVICE_CREATED: 'Service created successfully.',
    SERVICE_UPDATED: 'Service updated successfully.',
    SERVICE_DELETED: 'Service deleted successfully.',
    USER_DELETED: 'User deleted successfully.',
  },

  // ── HTTP Status codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
  },

  // ── Security
  BCRYPT_SALT_ROUNDS: 12,
  JWT_EXPIRATION: '24h',
  MAX_REQUEST_SIZE: '10kb',

  // ── Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};
