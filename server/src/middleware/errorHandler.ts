import type { Request, Response, NextFunction } from 'express';
import { createErrorResponse, isDevelopment } from '../utils/helpers.js';
import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants.js';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  error: Error & { statusCode?: number; details?: string; code?: number; errors?: Record<string, { message: string }> },
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = error.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = error.message || ERROR_MESSAGES.INTERNAL_ERROR;
  let { details } = error;

  // Handle different types of errors
  if (error.name === 'ValidationError' && error.errors) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = ERROR_MESSAGES.VALIDATION_ERROR;
    const { errors } = error;
    details = Object.values(errors)
      .map((err) => err.message)
      .join(', ');
  } else if (error.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid ID format';
  } else if (error.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    message = 'Duplicate field value';
    details = 'A resource with this value already exists';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = ERROR_MESSAGES.INVALID_TOKEN;
  } else if (error.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = ERROR_MESSAGES.TOKEN_EXPIRED;
  }

  // Log error in development
  if (isDevelopment()) {
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  }

  // Send error response
  res.status(statusCode).json(createErrorResponse(message, isDevelopment() ? details || error.stack : details));
};

/**
 * Handle 404 errors (route not found)
 */
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  const error = new AppError(`Route ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND);
  next(error);
};

/**
 * Async error wrapper to catch async errors in route handlers
 */
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export const asyncHandler = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: string;

  constructor(message: string, statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    if (details !== undefined) {
      this.details = details;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create a bad request error
 */
export const createBadRequestError = (message: string, details?: string): AppError => {
  return new AppError(message, HTTP_STATUS.BAD_REQUEST, details);
};

/**
 * Create an unauthorized error
 */
export const createUnauthorizedError = (message: string, details?: string): AppError => {
  return new AppError(message, HTTP_STATUS.UNAUTHORIZED, details);
};

/**
 * Create a forbidden error
 */
export const createForbiddenError = (message: string, details?: string): AppError => {
  return new AppError(message, HTTP_STATUS.FORBIDDEN, details);
};

/**
 * Create a not found error
 */
export const createNotFoundError = (message: string, details?: string): AppError => {
  return new AppError(message, HTTP_STATUS.NOT_FOUND, details);
};

/**
 * Create a conflict error
 */
export const createConflictError = (message: string, details?: string): AppError => {
  return new AppError(message, HTTP_STATUS.CONFLICT, details);
};
