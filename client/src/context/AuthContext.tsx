import React, { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthService } from '../services/authService';
import { tokenUtils } from '../lib/api';
import { deduplicateOperation } from '../utils/deduplication';
import FullPageLoading from '../components/ui/FullPageLoading';
import type {
  AuthContextType,
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  UpdateProfileRequest,
  User,
} from '../types/auth';

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);

      // Check if user has valid tokens
      if (AuthService.isAuthenticated()) {
        // Try to fetch user profile
        const userProfile = await AuthService.getProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
      } else {
        // No valid tokens, user is not authenticated
        setUser(null);
        setIsAuthenticated(false);
        tokenUtils.clearTokens();
      }
    } catch (_error) {
      // Error fetching profile, clear auth state
      setUser(null);
      setIsAuthenticated(false);
      tokenUtils.clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await AuthService.login(credentials);

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success('Welcome back!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await AuthService.register(userData);

      if (response.requiresEmailVerification) {
        // Don't set user as authenticated if email verification is required
        setUser(response.user);
        setIsAuthenticated(false);
        // Don't show toast here - let the popup handle the UX
      } else if (response.tokens) {
        // OAuth or auto-verified users
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Account created successfully!');
      }

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);

      await AuthService.logout();

      setUser(null);
      setIsAuthenticated(false);

      toast.success('Logged out successfully');
    } catch (_error) {
      // Even if logout API fails, clear local state
      setUser(null);
      setIsAuthenticated(false);

      toast.error('Logout failed, but you have been signed out locally');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileRequest): Promise<void> => {
    try {
      setIsLoading(true);

      const updatedUser = await AuthService.updateProfile(data);

      setUser(updatedUser);

      toast.success('Profile updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
    try {
      setIsLoading(true);

      await AuthService.changePassword(data);

      toast.success('Password changed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password change failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileImage = async (imageData: string): Promise<void> => {
    try {
      setIsLoading(true);

      const updatedUser = await AuthService.updateProfileImage(imageData);
      setUser(updatedUser);

      toast.success('Profile picture updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile picture update failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (currentPassword?: string): Promise<void> => {
    try {
      setIsLoading(true);

      await AuthService.deleteAccount(currentPassword);

      setUser(null);
      setIsAuthenticated(false);

      toast.success('Account deleted successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Account deletion failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      if (isAuthenticated) {
        const userProfile = await AuthService.getProfile();
        setUser(userProfile);
      }
    } catch (_error) {
      // If refresh fails, user might be logged out
      setUser(null);
      setIsAuthenticated(false);
      tokenUtils.clearTokens();
    }
  };

  const verifyEmail = async (token: string): Promise<void> => {
    return deduplicateOperation(`verify-email-${token}`, async () => {
      try {
        setIsLoading(true);

        const response = await AuthService.verifyEmail(token);

        setUser(response.user);
        setIsAuthenticated(true);

        toast.success('Email verified successfully! Welcome to AuthVerse!');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Email verification failed';
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    });
  };

  const verifyEmailWithOTP = async (email: string, otp: string): Promise<void> => {
    return deduplicateOperation(`verify-otp-${email}-${otp}`, async () => {
      try {
        const response = await AuthService.verifyEmailWithOTP(email, otp);
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Email verified successfully!');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'OTP verification failed';
        throw new Error(errorMessage);
      }
    });
  };

  const resendEmailVerification = async (email: string): Promise<void> => {
    try {
      await AuthService.resendEmailVerification(email);
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend verification email';
      toast.error(errorMessage);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    updateProfileImage,
    deleteAccount,
    refreshUser,
    verifyEmail,
    verifyEmailWithOTP,
    resendEmailVerification,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <FullPageLoading message="Verifying authentication..." />;
    }

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/signin';
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

// Hook for checking authentication status
export const useAuthStatus = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    user,
    isLoggedIn: isAuthenticated && !isLoading,
    isGuest: !isAuthenticated && !isLoading,
  };
};
