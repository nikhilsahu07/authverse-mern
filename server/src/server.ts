import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import { getEnvVar } from './utils/helpers.js';
import { DEFAULTS } from './utils/constants.js';

// Load environment variables
dotenv.config();

const PORT = parseInt(getEnvVar('PORT', DEFAULTS.PORT.toString()), 10);
const NODE_ENV = getEnvVar('NODE_ENV', DEFAULTS.NODE_ENV);

async function startServer(): Promise<void> {
  try {
    // Connect to database
    await connectDatabase();

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`
🚀 Server is running!
📍 Environment: ${NODE_ENV}
🌐 Port: ${PORT}
🔗 URL: http://localhost:${PORT}
📋 Health check: http://localhost:${PORT}/health
🔐 Auth API: http://localhost:${PORT}/api/auth
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string): void => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

      server.close(() => {
        console.log('✅ HTTP server closed');

        void (async (): Promise<void> => {
          try {
            // Close database connection
            const { disconnectDatabase } = await import('./config/database.js');
            await disconnectDatabase();
            console.log('✅ Database disconnected');
            console.log('👋 Graceful shutdown completed');
            process.exit(0);
          } catch (error) {
            console.error('❌ Error during shutdown:', error);
            process.exit(1);
          }
        })();
      });
    };

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      gracefulShutdown('SIGTERM');
    });
    process.on('SIGINT', () => {
      gracefulShutdown('SIGINT');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
void startServer();
