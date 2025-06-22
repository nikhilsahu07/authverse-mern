import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, RefreshCw, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const hasVerified = useRef(false);

  useEffect(() => {
    const handleVerification = async () => {
      // Prevent multiple calls
      if (hasVerified.current) {
        return;
      }

      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setErrorMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        hasVerified.current = true;
        await verifyEmail(token);

        setStatus('success');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 2000);
      } catch (error) {
        hasVerified.current = false; // Reset on error to allow retry
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Email verification failed');
      }
    };

    handleVerification();
  }, [searchParams, navigate, verifyEmail]);

  const handleRetry = () => {
    hasVerified.current = false; // Reset verification flag
    setStatus('loading');
    setErrorMessage('');
    const token = searchParams.get('token');
    if (token) {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {status === 'loading' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Verifying Your Email</h1>
            <p className="text-blue-100/80 mb-6">Please wait while we verify your email address...</p>
            <LoadingSpinner size="sm" message="Verifying..." />
          </div>
        )}

        {status === 'success' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Email Verified Successfully! 🎉</h1>
            <p className="text-blue-100/80 mb-6">
              Welcome to AuthVerse! Your email has been verified and you&apos;re now logged in.
            </p>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-300 text-sm">Redirecting you to your dashboard in a moment...</p>
            </div>
            <button
              onClick={() => navigate('/dashboard', { replace: true })}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:from-indigo-600 hover:to-blue-600 hover:shadow-xl"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Verification Failed</h1>
            <p className="text-blue-100/80 mb-4">We couldn&apos;t verify your email address. This might be because:</p>
            <ul className="text-left text-blue-100/70 text-sm mb-6 space-y-1">
              <li>• The verification link has expired</li>
              <li>• The link has already been used</li>
              <li>• The link is invalid or corrupted</li>
            </ul>

            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-300 text-sm">{errorMessage}</p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-slate-700/50 border border-slate-600/50 text-blue-100 font-medium py-3 px-4 rounded-lg transition-all hover:bg-slate-600/50 hover:border-slate-500/50"
              >
                Try Again
              </button>
              <button
                onClick={handleGoHome}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:from-indigo-600 hover:to-blue-600 hover:shadow-xl"
              >
                Go to Home
              </button>
            </div>

            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
              <p className="text-blue-100/60 text-xs">
                Need help? Contact our support team for assistance with email verification.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
