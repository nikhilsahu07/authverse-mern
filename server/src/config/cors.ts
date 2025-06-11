import cors from 'cors';
import { getEnvVar, isDevelopment } from '../utils/helpers.js';

/**
 * CORS configuration options
 */
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = getEnvVar('ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim());

    // Allow requests with no origin (like mobile apps or curl requests) in development
    if (isDevelopment() && !origin) {
      callback(null, true); return;
    }

    if (allowedOrigins.includes(origin as string) || isDevelopment()) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control', 'Pragma'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  preflightContinue: false,
};

export default cors(corsOptions);
