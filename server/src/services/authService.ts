import User, { type IUserDocument } from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import { hashPassword, comparePassword } from '../utils/crypto.js';
import { generateTokens, verifyRefreshToken } from '../utils/jwt.js';
import { normalizeEmail } from '../utils/validation.js';
import type { JWTPayload } from '../types/common.types.js';
import type { LoginResponse, Tokens } from '../types/auth.types.js';
import { ERROR_MESSAGES } from '../utils/constants.js';
import { createConflictError, createUnauthorizedError, createNotFoundError } from '../middleware/errorHandler.js';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: IUserDocument; tokens: Tokens }> {
    const { email, password, firstName, lastName } = userData;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw createConflictError(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      email: normalizeEmail(email),
      password: hashedPassword,
      firstName,
      lastName,
    });

    await user.save();

    // Generate tokens
    const payload: JWTPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const tokens = generateTokens(payload);

    // Save refresh token
    await this.saveRefreshToken(user._id.toString(), tokens.refreshToken.token);

    return { user, tokens };
  }

  /**
   * Login user
   */
  static async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const { email, password } = credentials;

    // Find user by email
    const user = await User.findByEmail(email).select('+password');
    if (!user) {
      throw createUnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Check if user is active
    if (!user.isActive) {
      throw createUnauthorizedError('Account is deactivated');
    }

    // Verify password
    if (!user.password) {
      throw createUnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw createUnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const payload: JWTPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const tokens = generateTokens(payload);

    // Save refresh token
    await this.saveRefreshToken(user._id.toString(), tokens.refreshToken.token);

    // Remove password from response and map to expected type
    const userResponse = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profileImage: user.profileImage,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
      lastLogin: user.lastLogin?.toISOString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return {
      user: userResponse,
      tokens: {
        accessToken: tokens.accessToken.token,
        refreshToken: tokens.refreshToken.token,
      },
    };
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshTokenString: string): Promise<Tokens> {
    try {
      // Verify refresh token
      const decoded = verifyRefreshToken(refreshTokenString);

      // Find and validate stored refresh token
      const storedToken = await RefreshToken.findValidToken(refreshTokenString);
      if (!storedToken) {
        throw createUnauthorizedError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
      }

      // Find user
      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw createUnauthorizedError(ERROR_MESSAGES.USER_NOT_FOUND);
      }

      // Generate new tokens
      const payload: JWTPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };

      const newTokens = generateTokens(payload);

      // Revoke old refresh token and save new one
      storedToken.revoke();
      await storedToken.save();
      await this.saveRefreshToken(user._id.toString(), newTokens.refreshToken.token);

      return newTokens;
    } catch (_error) {
      throw createUnauthorizedError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
    }
  }

  /**
   * Logout user (revoke refresh token)
   */
  static async logout(refreshTokenString: string): Promise<void> {
    const storedToken = await RefreshToken.findOne({ token: refreshTokenString });
    if (storedToken) {
      storedToken.revoke();
      await storedToken.save();
    }
  }

  /**
   * Logout from all devices (revoke all refresh tokens for user)
   */
  static async logoutAll(userId: string): Promise<void> {
    await RefreshToken.revokeAllUserTokens(userId as unknown as import('mongoose').Types.ObjectId);
  }

  /**
   * Change user password
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    // Find user with password
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw createNotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Verify current password
    if (!user.password) {
      throw createUnauthorizedError('Current password is incorrect');
    }
    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw createUnauthorizedError('Current password is incorrect');
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    // Revoke all refresh tokens to force re-login
    await this.logoutAll(userId);
  }

  /**
   * Generate password reset token
   */
  static async generatePasswordResetToken(email: string): Promise<string> {
    const user = await User.findByEmail(email);
    if (!user) {
      throw createNotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Generate reset token (you can implement JWT-based or crypto-based tokens)
    const resetToken = 'implement-reset-token-generation';

    // Save token to user (implement token storage)
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    return resetToken;
  }

  /**
   * Reset password using reset token
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await User.findByPasswordResetToken(token);
    if (!user) {
      throw createUnauthorizedError(ERROR_MESSAGES.PASSWORD_RESET_INVALID);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.clearPasswordResetTokens();
    await user.save();

    // Revoke all refresh tokens
    await this.logoutAll(user._id.toString());
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<void> {
    const user = await User.findByEmailVerificationToken(token);
    if (!user) {
      throw createUnauthorizedError(ERROR_MESSAGES.EMAIL_VERIFICATION_INVALID);
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.clearVerificationTokens();
    await user.save();
  }

  /**
   * Resend email verification
   */
  static async resendEmailVerification(email: string): Promise<string> {
    const user = await User.findByEmail(email);
    if (!user) {
      throw createNotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (user.isEmailVerified) {
      throw createConflictError('Email is already verified');
    }

    // Generate verification token
    const verificationToken = 'implement-verification-token-generation';

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await user.save();

    return verificationToken;
  }

  /**
   * Save refresh token to database
   */
  private static async saveRefreshToken(userId: string, token: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const refreshToken = new RefreshToken({
      token,
      userId,
      expiresAt,
    });

    await refreshToken.save();
  }

  /**
   * Cleanup expired tokens
   */
  static async cleanupExpiredTokens(): Promise<void> {
    await RefreshToken.cleanupExpiredTokens();
  }
}
