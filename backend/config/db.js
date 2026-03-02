// config/db.js — MongoDB connection configuration
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  const maxRetries = 3;
  let retryCount = 0;

  const connect = async () => {
    try {
      const mongoUri = process.env.MONGO_URI;

      if (!mongoUri) {
        throw new Error('MONGO_URI environment variable is not set');
      }

      const conn = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      logger.info(`MongoDB connected successfully to ${conn.connection.host}:${conn.connection.port}`);
      logger.info(`Database: ${conn.connection.name}`);
      return conn;
    } catch (error) {
      retryCount++;
      logger.error(`MongoDB Connection Error (Attempt ${retryCount}/${maxRetries}): ${error.message}`);

      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        logger.info(`Retrying in ${delay / 1000} seconds...`);
        return new Promise((resolve, reject) => {
          setTimeout(() => connect().then(resolve).catch(reject), delay);
        });
      } else {
        logger.error('Failed to connect to MongoDB after maximum retries');
        process.exit(1);
      }
    }
  };

  return connect();
};

module.exports = connectDB;
