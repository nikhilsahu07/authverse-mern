import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { BCRYPT_ROUNDS } from './constants.js';

/**
 * Hash a password using bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, BCRYPT_ROUNDS);
  } catch (_error) {
    throw new Error('Error hashing password');
  }
};

/**
 * Compare a plain password with a hashed password
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (_error) {
    return false;
  }
};

/**
 * Generate a secure random token
 */
export const generateSecureToken = (length = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Generate a cryptographically secure random UUID-like string
 */
export const generateUniqueId = (): string => {
  return crypto.randomUUID();
};

/**
 * Create a hash of the given data
 */
export const createHash = (data: string, algorithm = 'sha256'): string => {
  return crypto.createHash(algorithm).update(data).digest('hex');
};

/**
 * Generate a secure OTP (One Time Password)
 */
export const generateOTP = (length = 6): string => {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits[randomIndex];
  }

  return otp;
};

/**
 * Generate a password reset token with expiration
 */
export const generatePasswordResetToken = (): {
  token: string;
  hashedToken: string;
  expiresAt: Date;
} => {
  const token = generateSecureToken(32);
  const hashedToken = createHash(token);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  return { token, hashedToken, expiresAt };
};

/**
 * Generate an email verification token with expiration
 */
export const generateEmailVerificationToken = (): {
  token: string;
  hashedToken: string;
  expiresAt: Date;
} => {
  const token = generateSecureToken(32);
  const hashedToken = createHash(token);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  return { token, hashedToken, expiresAt };
};
