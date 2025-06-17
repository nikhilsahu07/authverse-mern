import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import corsMiddleware from './config/cors.js';
import authRoutes from './routes/auth.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { createSuccessResponse } from './utils/helpers.js';
import { configurePassport } from './config/passport.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(corsMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware for OAuth
app.use(
  session({
    secret: process.env['JWT_SECRET'] || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env['NODE_ENV'] === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport strategies AFTER everything is initialized
configurePassport();

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
