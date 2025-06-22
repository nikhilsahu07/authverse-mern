import type { Request, Response, NextFunction } from 'express';
import {
  validateRegistration,
  validateLogin,
  validatePasswordChange,
  validateProfileUpdate,
  validateDeleteAccount,
  validateEmail,
  normalizeEmail,
  sanitizeString,
} from '../utils/validation.js';
import { createErrorResponse } from '../utils/helpers.js';
import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants.js';

/**
 * Middleware to validate registration request
 */
export const validateRegisterRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Sanitize input data
    if (req.body.email) {
      req.body.email = normalizeEmail(req.body.email);
    }
    if (req.body.firstName) {
      req.body.firstName = sanitizeString(req.body.firstName);
    }
    if (req.body.lastName) {
      req.body.lastName = sanitizeString(req.body.lastName);
    }

    const validation = validateRegistration(req.body);

    if (!validation.isValid) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, validation.errors.join(', ')));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate login request
 */
export const validateLoginRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Sanitize input data
    if (req.body.email) {
      req.body.email = normalizeEmail(req.body.email);
    }

    const validation = validateLogin(req.body);

    if (!validation.isValid) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, validation.errors.join(', ')));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate password change request
 */
export const validatePasswordChangeRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const validation = validatePasswordChange(req.body);

    if (!validation.isValid) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, validation.errors.join(', ')));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate profile update request
 */
export const validateProfileUpdateRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Sanitize input data
    if (req.body.firstName) {
      req.body.firstName = sanitizeString(req.body.firstName);
    }
    if (req.body.lastName) {
      req.body.lastName = sanitizeString(req.body.lastName);
    }
    // Note: We don't sanitize profileImage as it's base64 data

    const validation = validateProfileUpdate(req.body);

    if (!validation.isValid) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, validation.errors.join(', ')));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate email in request body
 */
export const validateEmailRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Sanitize input data
    if (req.body.email) {
      req.body.email = normalizeEmail(req.body.email);
    }

    const validation = validateEmail(req.body.email);

    if (!validation.isValid) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, validation.errors.join(', ')));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate password reset request
 */
export const validatePasswordResetRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { token, newPassword } = req.body;

    if (!token) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 'Reset token is required'));
      return;
    }

    if (!newPassword) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 'New password is required'));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate token in request body
 */
export const validateTokenRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { token } = req.body;

    if (!token) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 'Token is required'));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate delete account request
 */
export const validateDeleteAccountRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const validation = validateDeleteAccount(req.body);

    if (!validation.isValid) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, validation.errors.join(', ')));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate refresh token request
 */
export const validateRefreshTokenRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 'Refresh token is required'));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate email verification with token request
 */
export const validateVerifyEmailRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { token } = req.body;

    if (!token || typeof token !== 'string') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 'Verification token is required'));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};

/**
 * Middleware to validate email verification with OTP request
 */
export const validateVerifyEmailOTPRequest = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { email, otp } = req.body;

    // Sanitize email
    if (email) {
      req.body.email = normalizeEmail(email);
    }

    if (!email || typeof email !== 'string') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 'Email is required'));
      return;
    }

    if (!otp || typeof otp !== 'string') {
      res.status(HTTP_STATUS.BAD_REQUEST).json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 'OTP is required'));
      return;
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 'OTP must be 6 digits'));
      return;
    }

    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(createErrorResponse(ERROR_MESSAGES.VALIDATION_ERROR, emailValidation.errors.join(', ')));
      return;
    }

    next();
  } catch (_error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 'Validation error'));
  }
};
