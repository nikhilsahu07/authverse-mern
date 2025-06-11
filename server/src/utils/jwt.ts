import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import type { JWTPayload, Tokens } from '../types/common.types.js';
import { JWT_CONFIG } from './constants.js';

/**
 * Generate an access token
 */
export const generateAccessToken = (payload: JWTPayload): string => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, {
    expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
    issuer: 'authverse',
    audience: 'authverse-users',
    jwtid: uuidv4(),
  });
};

/**
 * Generate a refresh token
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
  const secret = process.env['JWT_REFRESH_SECRET'];
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, {
    expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
    issuer: 'authverse',
    audience: 'authverse-users',
    jwtid: uuidv4(),
  });
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokens = (payload: JWTPayload): Tokens => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Calculate expiration times
  const accessTokenExpiresIn = getTokenExpirationTime(JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN);
  const refreshTokenExpiresIn = getTokenExpirationTime(JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN);

  return {
    accessToken: {
      token: accessToken,
      expiresIn: accessTokenExpiresIn,
    },
    refreshToken: {
      token: refreshToken,
      expiresIn: refreshTokenExpiresIn,
    },
  };
};

/**
 * Verify an access token
 */
export const verifyAccessToken = (token: string): JWTPayload => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, secret, {
      issuer: 'authverse',
      audience: 'authverse-users',
    }) as JWTPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Access token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid access token');
    }
    throw new Error('Token verification failed');
  }
};

/**
 * Verify a refresh token
 */
export const verifyRefreshToken = (token: string): JWTPayload => {
  const secret = process.env['JWT_REFRESH_SECRET'];
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, secret, {
      issuer: 'authverse',
      audience: 'authverse-users',
    }) as JWTPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Refresh token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid refresh token');
    }
    throw new Error('Token verification failed');
  }
};

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1] || null;
};

/**
 * Generate a password reset token
 */
export const generatePasswordResetToken = (payload: { userId: string; email: string }): string => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, {
    expiresIn: JWT_CONFIG.PASSWORD_RESET_EXPIRES_IN,
    issuer: 'authverse',
    audience: 'authverse-password-reset',
    jwtid: uuidv4(),
  });
};

/**
 * Verify a password reset token
 */
export const verifyPasswordResetToken = (token: string): { userId: string; email: string } => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, secret, {
      issuer: 'authverse',
      audience: 'authverse-password-reset',
    }) as { userId: string; email: string };

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Password reset token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid password reset token');
    }
    throw new Error('Token verification failed');
  }
};

/**
 * Generate an email verification token
 */
export const generateEmailVerificationToken = (payload: { userId: string; email: string }): string => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, {
    expiresIn: JWT_CONFIG.EMAIL_VERIFICATION_EXPIRES_IN,
    issuer: 'authverse',
    audience: 'authverse-email-verification',
    jwtid: uuidv4(),
  });
};

/**
 * Verify an email verification token
 */
export const verifyEmailVerificationToken = (token: string): { userId: string; email: string } => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, secret, {
      issuer: 'authverse',
      audience: 'authverse-email-verification',
    }) as { userId: string; email: string };

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Email verification token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid email verification token');
    }
    throw new Error('Token verification failed');
  }
};

/**
 * Convert JWT expiration string to timestamp
 */
const getTokenExpirationTime = (expiresIn: string): number => {
  const now = Date.now();
  const match = /^(\d+)([smhd])$/.exec(expiresIn);

  if (!match?.[1] || !match?.[2]) {
    throw new Error('Invalid expiration format');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return now + value * 1000;
    case 'm':
      return now + value * 60 * 1000;
    case 'h':
      return now + value * 60 * 60 * 1000;
    case 'd':
      return now + value * 24 * 60 * 60 * 1000;
    default:
      throw new Error('Invalid expiration unit');
  }
};
