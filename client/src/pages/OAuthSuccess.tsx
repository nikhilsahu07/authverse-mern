import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../services/authService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refresh');

        if (!token || !refreshToken) {
          throw new Error('Missing OAuth tokens');
        }

        // Handle the OAuth callback
        AuthService.handleOAuthCallback(token, refreshToken);

        // Refresh the user in auth context
        await refreshUser();

        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/signin?error=oauth_failed', { replace: true });
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, refreshUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <h2 className="text-xl font-semibold text-white mt-4">Completing your sign in...</h2>
        <p className="text-blue-100/70 mt-2">Please wait while we set up your account</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
