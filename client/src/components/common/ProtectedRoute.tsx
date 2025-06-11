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
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <FullPageLoading message="Checking authentication..." />;
  }

  // If route requires auth but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If route is for guests only but user is authenticated
  if (!requireAuth && isAuthenticated) {
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
