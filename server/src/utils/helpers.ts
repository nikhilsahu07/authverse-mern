import type { ApiResponse } from '../types/common.types.js';

/**
 * Create a standardized API response
 */
export const createApiResponse = <T>(success: boolean, message: string, data?: T, error?: string): ApiResponse<T> => {
  const response: ApiResponse<T> = {
    success,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (error) {
    response.error = error;
  }

  return response;
};

/**
 * Create a success response
 */
export const createSuccessResponse = <T>(message: string, data?: T): ApiResponse<T> => {
  return createApiResponse(true, message, data);
};

/**
 * Create an error response
 */
export const createErrorResponse = (message: string, error?: string): ApiResponse<undefined> => {
  return createApiResponse(false, message, undefined, error);
};

/**
 * Sleep utility for testing or rate limiting
 */
export const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Check if environment is development
 */
export const isDevelopment = (): boolean => {
  return process.env['NODE_ENV'] === 'development';
};

/**
 * Check if environment is production
 */
export const isProduction = (): boolean => {
  return process.env['NODE_ENV'] === 'production';
};

/**
 * Check if environment is test
 */
export const isTest = (): boolean => {
  return process.env['NODE_ENV'] === 'test';
};

/**
 * Get environment variable with default value
 */
export const getEnvVar = (key: string, defaultValue = ''): string => {
  return process.env[key] || defaultValue;
};

/**
 * Get required environment variable (throws error if not found)
 */
export const getRequiredEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
};

/**
 * Convert string to boolean
 */
export const stringToBoolean = (str: string): boolean => {
  return str.toLowerCase() === 'true';
};

/**
 * Get pagination parameters from query
 */
export const getPaginationParams = (query: Record<string, unknown>): { page: number; limit: number; skip: number } => {
  const pageStr = typeof query['page'] === 'string' ? query['page'] : '1';
  const limitStr = typeof query['limit'] === 'string' ? query['limit'] : '10';

  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(limitStr, 10) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Remove sensitive fields from user object
 */
export const sanitizeUser = (
  user: { toObject?: () => Record<string, unknown> } & Record<string, unknown>,
): Record<string, unknown> => {
  const userObj = user.toObject ? user.toObject() : user;
  const {
    password: _password,
    emailVerificationToken: _emailVerificationToken,
    passwordResetToken: _passwordResetToken,
    ...sanitizedUser
  } = userObj as Record<string, unknown> & {
    password?: unknown;
    emailVerificationToken?: unknown;
    passwordResetToken?: unknown;
  };
  return sanitizedUser;
};

/**
 * Generate a random string of specified length
 */
export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Capitalize first letter of a string
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format date to ISO string
 */
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

/**
 * Check if a date is expired
 */
export const isDateExpired = (date: Date): boolean => {
  return new Date() > date;
};

/**
 * Get client IP address from request
 */
export const getClientIp = (req: {
  headers: Record<string, string | string[] | undefined>;
  connection?: { remoteAddress?: string };
  socket?: { remoteAddress?: string };
  ip?: string;
}): string => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const xRealIp = req.headers['x-real-ip'];

  return (
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]) ||
    (typeof xRealIp === 'string' ? xRealIp : undefined) ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    'unknown'
  );
};

/**
 * Mask email address for privacy
 */
export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@');
  if (!username || !domain) {
    return email; // Return original email if split fails
  }
  const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);
  return `${maskedUsername}@${domain}`;
};

/**
 * Calculate password strength score (0-100)
 */
export const calculatePasswordStrength = (password: string): number => {
  let score = 0;

  // Length
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 25;

  // Character types
  if (/[a-z]/.test(password)) score += 12.5;
  if (/[A-Z]/.test(password)) score += 12.5;
  if (/[0-9]/.test(password)) score += 12.5;
  if (/[^A-Za-z0-9]/.test(password)) score += 12.5;

  return Math.min(100, score);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
