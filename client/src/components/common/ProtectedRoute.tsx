import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FullPageLoading from '../ui/FullPageLoading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/signin',
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <FullPageLoading message="Checking authentication..." />;
  }

  // Redirect unauthenticated users to signin
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Handle guest-only routes (login, register)
  if (!requireAuth && isAuthenticated) {
    const isSignupPage = location.pathname === '/signup';
    const isEmailNotVerified = user && !user.isEmailVerified;

    // Allow staying on signup page if email verification is pending
    if (isSignupPage && isEmailNotVerified) {
      return <>{children}</>;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Wrapper for routes that require authentication
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute requireAuth={true} redirectTo="/signin">
      {children}
    </ProtectedRoute>
  );
};

// Wrapper for routes that are only for guests (login, register)
export const RequireGuest: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
      {children}
    </ProtectedRoute>
  );
};
