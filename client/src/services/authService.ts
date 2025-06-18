import { api, handleApiError, tokenUtils } from '../lib/api';
import type { ApiResponse } from '../lib/api';
import type {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateProfileRequest,
  User,
} from '../types/auth';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register', userData);

      const { user, tokens } = response.data.data ?? { user: null, tokens: null };
      if (!user || !tokens) {
        throw new Error('Invalid response from server');
      }

      // Store tokens in cookies
      tokenUtils.setTokens(tokens.accessToken, tokens.refreshToken);

      return { user, tokens };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Login user
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);

      const { user, tokens } = response.data.data ?? { user: null, tokens: null };
      if (!user || !tokens) {
        throw new Error('Invalid response from server');
      }

      // Store tokens in cookies
      tokenUtils.setTokens(tokens.accessToken, tokens.refreshToken);

      return { user, tokens };
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      const refreshToken = tokenUtils.getRefreshToken();

      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      // Even if logout API fails, we should clear local tokens
      console.error('Logout API error:', error);
    } finally {
      // Always clear tokens from cookies
      tokenUtils.clearTokens();
    }
  }

  /**
   * Logout from all devices
   */
  static async logoutAll(): Promise<void> {
    try {
      await api.post('/auth/logout-all');
    } catch (error) {
      console.error('Logout all API error:', error);
    } finally {
      // Always clear tokens from cookies
      tokenUtils.clearTokens();
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(): Promise<User> {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/profile');
      const user = response.data.data;
      if (!user) {
        throw new Error('Invalid response from server');
      }
      return user;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(profileData: UpdateProfileRequest): Promise<User> {
    try {
      const response = await api.put<ApiResponse<User>>('/auth/profile', profileData);
      const user = response.data.data;
      if (!user) {
        throw new Error('Invalid response from server');
      }
      return user;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Update profile image
   */
  static async updateProfileImage(imageData: string): Promise<User> {
    try {
      const response = await api.put<ApiResponse<User>>('/auth/profile', { profileImage: imageData });
      const user = response.data.data;
      if (!user) {
        throw new Error('Invalid response from server');
      }
      return user;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Change password
   */
  static async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    try {
      await api.post('/auth/change-password', passwordData);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Delete user account
   */
  static async deleteAccount(currentPassword?: string): Promise<void> {
    try {
      // Send password only if provided (OAuth users won't have one)
      const payload = currentPassword ? { currentPassword } : {};
      await api.post('/auth/delete-account', payload);
    } catch (error) {
      throw new Error(handleApiError(error));
    } finally {
      // Always clear tokens after account deletion
      tokenUtils.clearTokens();
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const refreshToken = tokenUtils.getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
        '/auth/refresh-token',
        { refreshToken },
      );

      const tokens = response.data.data;
      if (!tokens) {
        throw new Error('Invalid response from server');
      }

      // Update tokens in cookies
      tokenUtils.setTokens(tokens.accessToken, tokens.refreshToken);

      return tokens;
    } catch (error) {
      // If refresh fails, clear tokens
      tokenUtils.clearTokens();
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const accessToken = tokenUtils.getAccessToken();
    const refreshToken = tokenUtils.getRefreshToken();

    // User is authenticated if they have valid tokens
    return Boolean(
      accessToken &&
        refreshToken &&
        (!tokenUtils.isTokenExpired(accessToken) || !tokenUtils.isTokenExpired(refreshToken)),
    );
  }

  /**
   * Get user info from token
   */
  static getUserFromToken(): Partial<User> | null {
    const token = tokenUtils.getAccessToken();

    if (!token || tokenUtils.isTokenExpired(token)) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
      };
    } catch {
      return null;
    }
  }

  /**
   * Send forgot password email
   */
  static async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<void> {
    try {
      await api.post('/auth/verify-email', { token });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Resend email verification
   */
  static async resendEmailVerification(email: string): Promise<void> {
    try {
      await api.post('/auth/resend-verification', { email });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Initiate OAuth login
   */
  static initiateOAuthLogin(provider: 'google' | 'github' | 'facebook'): void {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${baseUrl}/api/auth/${provider}`;
  }

  /**
   * Handle OAuth callback
   */
  static handleOAuthCallback(token: string, refreshToken: string): LoginResponse {
    // Store tokens in cookies
    tokenUtils.setTokens(token, refreshToken);

    // Decode user info from token
    const user = this.getUserFromToken();
    if (!user) {
      throw new Error('Invalid token received from OAuth provider');
    }

    return {
      user: user as any,
      tokens: {
        accessToken: token,
        refreshToken,
      },
    };
  }
}
