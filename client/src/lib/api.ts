import axios, { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Global flag to prevent redirects during OTP verification
let isOTPVerificationInProgress = false;

// Export functions to control the flag
export const setOTPVerificationInProgress = (inProgress: boolean) => {
  isOTPVerificationInProgress = inProgress;
};

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Token management
export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

// Token utilities
export const tokenUtils = {
  getAccessToken: (): string | null => {
    return Cookies.get(TOKEN_KEYS.ACCESS_TOKEN) || null;
  },

  getRefreshToken: (): string | null => {
    return Cookies.get(TOKEN_KEYS.REFRESH_TOKEN) || null;
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    // Set access token with 15 minutes expiry
    Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, accessToken, {
      expires: 1 / 96, // 15 minutes in days
      secure: import.meta.env.PROD,
      sameSite: 'strict',
    });

    // Set refresh token with 7 days expiry
    Cookies.set(TOKEN_KEYS.REFRESH_TOKEN, refreshToken, {
      expires: 7, // 7 days
      secure: import.meta.env.PROD,
      sameSite: 'strict',
    });
  },

  clearTokens: (): void => {
    Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
    Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokenUtils.getAccessToken();
    if (token && !tokenUtils.isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    type RetryableRequest = InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const originalRequest = error.config as RetryableRequest;

    // Check if this is an OTP verification request - don't redirect on these errors
    const isOTPVerification =
      originalRequest?.url?.includes('/verify-email-otp') ||
      originalRequest?.url?.includes('/verify-email') ||
      originalRequest?.url?.includes('/resend-verification') ||
      originalRequest?.url?.includes('/register');

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isOTPVerification) {
      originalRequest._retry = true;

      const refreshToken = tokenUtils.getRefreshToken();

      if (refreshToken && !tokenUtils.isTokenExpired(refreshToken)) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          tokenUtils.setTokens(accessToken, newRefreshToken);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          tokenUtils.clearTokens();
          toast.error('Session expired. Please login again.');
          window.location.href = '/signin';
          return Promise.reject(refreshError);
        }
      } else if (!isOTPVerification && !isOTPVerificationInProgress) {
        // No valid refresh token, clear tokens and redirect (but not for OTP verification)
        tokenUtils.clearTokens();
        toast.error('Session expired. Please login again.');
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  },
);

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Error handler utility
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiResponse;
    return apiError?.message || apiError?.error || error.message || 'An unexpected error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};
