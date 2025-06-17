import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, extractTokenFromHeader } from '../utils/jwt.js';
import User, { type IUserDocument } from '../models/User.js';
import { createErrorResponse } from '../utils/helpers.js';
import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants.js';

// Extend Request interface for auth
interface AuthenticatedRequest extends Request {
  user?: any;
  userId?: string;
}

type ErrorMessage = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];

/**
 * Middleware to authenticate JWT tokens
 */
export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json(createErrorResponse(ERROR_MESSAGES.UNAUTHORIZED, 'No token provided'));
      return;
    }

    // Verify the token
    const decoded = verifyAccessToken(token);

    // Find the user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(createErrorResponse(ERROR_MESSAGES.USER_NOT_FOUND, 'User not found or inactive'));
      return;
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    let errorMessage: ErrorMessage = ERROR_MESSAGES.INVALID_TOKEN;

    if (error instanceof Error) {
      if (error.message.includes('expired')) {
        errorMessage = ERROR_MESSAGES.TOKEN_EXPIRED;
      } else if (error.message.includes('invalid')) {
        errorMessage = ERROR_MESSAGES.INVALID_TOKEN;
      }
    }

    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json(createErrorResponse(errorMessage, error instanceof Error ? error.message : 'Authentication failed'));
  }
};

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as IUserDocument;
  if (!user) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json(createErrorResponse(ERROR_MESSAGES.UNAUTHORIZED, 'Authentication required'));
    return;
  }

  if (user.role !== 'admin') {
    res.status(HTTP_STATUS.FORBIDDEN).json(createErrorResponse(ERROR_MESSAGES.ACCESS_DENIED, 'Admin access required'));
    return;
  }

  next();
};

/**
 * Middleware to check if user has verified email
 */
export const requireEmailVerified = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as IUserDocument;
  if (!user) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json(createErrorResponse(ERROR_MESSAGES.UNAUTHORIZED, 'Authentication required'));
    return;
  }

  if (!user.isEmailVerified) {
    res
      .status(HTTP_STATUS.FORBIDDEN)
      .json(createErrorResponse(ERROR_MESSAGES.EMAIL_NOT_VERIFIED, 'Email verification required'));
    return;
  }

  next();
};

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export const optionalAuth = async (req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId);

      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id.toString();
      }
    }

    next();
  } catch (_error) {
    // Continue without authentication if token is invalid
    next();
  }
};

/**
 * Middleware to check if user owns the resource or is admin
 */
export const requireOwnershipOrAdmin = (resourceUserIdParam = 'userId') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(createErrorResponse(ERROR_MESSAGES.UNAUTHORIZED, 'Authentication required'));
      return;
    }

    const resourceUserId = req.params[resourceUserIdParam];
    const currentUserId = req.userId;

    const user = req.user as IUserDocument;
    if (user.role === 'admin' || currentUserId === resourceUserId) {
      next();
    } else {
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json(createErrorResponse(ERROR_MESSAGES.ACCESS_DENIED, 'Access denied to this resource'));
    }
  };
};
