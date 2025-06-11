import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './config/cors.js';
import authRoutes from './routes/auth.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { createSuccessResponse } from './utils/helpers.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(corsMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json(
    createSuccessResponse('Server is healthy', {
      status: 'operational',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }),
  );
});

// API routes
app.use('/api/auth', authRoutes);

// Handle 404 errors
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
