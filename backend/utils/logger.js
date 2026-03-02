// utils/logger.js — Centralized logging utility
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => new Date().toISOString();

const LogLevel = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG',
};

const logger = {
  info: (message, data = null) => {
    const log = `[${getTimestamp()}] [${LogLevel.INFO}] ${message}${data ? ': ' + JSON.stringify(data) : ''}`;
    console.log(`ℹ️  ${log}`);
    writeToFile(log);
  },

  warn: (message, data = null) => {
    const log = `[${getTimestamp()}] [${LogLevel.WARN}] ${message}${data ? ': ' + JSON.stringify(data) : ''}`;
    console.warn(`⚠️  ${log}`);
    writeToFile(log);
  },

  error: (message, error = null) => {
    const log = `[${getTimestamp()}] [${LogLevel.ERROR}] ${message}${
      error ? ': ' + (error.stack || error.message || JSON.stringify(error)) : ''
    }`;
    console.error(`❌ ${log}`);
    writeToFile(log);
  },

  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      const log = `[${getTimestamp()}] [${LogLevel.DEBUG}] ${message}${data ? ': ' + JSON.stringify(data) : ''}`;
      console.debug(`🐛 ${log}`);
      writeToFile(log);
    }
  },
};

const writeToFile = (log) => {
  const logFile = path.join(logsDir, 'app.log');
  fs.appendFileSync(logFile, log + '\n');
};

module.exports = logger;
