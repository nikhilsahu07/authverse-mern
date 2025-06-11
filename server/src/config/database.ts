import mongoose from 'mongoose';
import { getRequiredEnvVar, isDevelopment } from '../utils/helpers.js';

/**
 * Database connection options
 */
const dbOptions: mongoose.ConnectOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferCommands: false,
};

/**
 * Connect to MongoDB
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = getRequiredEnvVar('MONGODB_URI');

    // Set mongoose options
    mongoose.set('strictQuery', false);

    if (isDevelopment()) {
      mongoose.set('debug', true);
    }

    await mongoose.connect(mongoUri, dbOptions);

    console.log('✅ MongoDB connected successfully');

    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📡 MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      mongoose.connection
        .close()
        .then(() => {
          console.log('📡 MongoDB connection closed through app termination');
          process.exit(0);
        })
        .catch((error) => {
          console.error('❌ Error closing MongoDB connection on SIGINT:', error);
          process.exit(1);
        });
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('📡 MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};

/**
 * Check database connection status
 */
export const getDatabaseStatus = (): string => {
  const state = mongoose.connection.readyState;

  switch (state) {
    case 0:
      return 'disconnected';
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'disconnecting';
    default:
      return 'unknown';
  }
};
