import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Mail, RefreshCw, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/authService';
import LoadingSpinner from '../ui/LoadingSpinner';

interface EmailVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  firstName: string;
  registrationData?: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
  onVerificationSuccess?: () => void;
  onSkipVerification?: () => void;
  onVerificationStatusChange?: (inProgress: boolean) => void;
}

const EmailVerificationPopup: React.FC<EmailVerificationPopupProps> = ({
  isOpen,
  onClose,
  email,
  firstName: _firstName,
  registrationData,
  onVerificationSuccess,
  onSkipVerification,
  onVerificationStatusChange,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [verificationMode, setVerificationMode] = useState<'otp' | 'magic'>('otp');
  const [otpError, setOtpError] = useState('');
  const [_showSkipOption, _setShowSkipOption] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const registrationAttemptedRef = useRef(false);

  const { verifyEmailWithOTP, resendEmailVerification } = useAuth();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Reset timer when resending
  useEffect(() => {
    if (isResending) {
      setTimeLeft(600);
    }
  }, [isResending]);

  // Handle initial registration
  useEffect(() => {
    if (isOpen && registrationData && !isRegistered && !registrationAttemptedRef.current) {
      registrationAttemptedRef.current = true;

      const performInitialRegistration = async () => {
        try {
          await AuthService.register({
            email: registrationData.email,
            password: registrationData.password,
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
          });
          setIsRegistered(true);
        } catch (_error) {
          // Don't show error - user can try resending if needed
          // Set as registered to prevent duplicate attempts
          setIsRegistered(true);
        }
      };

      performInitialRegistration();
    }
  }, [isOpen, registrationData, isRegistered]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== '') && value && !isVerifying) {
      setTimeout(() => {
        handleVerifyOTP(newOtp.join(''));
      }, 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');

    if (digits.length === 6) {
      setOtp(digits);
      setOtpError('');
      handleVerifyOTP(digits.join(''));
    }
  };

  const handleVerifyOTP = async (otpCode: string) => {
    if (isVerifying) {
      return;
    }

    // Import the flag function dynamically
    const { setOTPVerificationInProgress } = await import('../../lib/api');

    setIsVerifying(true);
    setOtpError('');

    // Set global flag to prevent redirects
    setOTPVerificationInProgress(true);

    // Notify parent that verification is in progress
    if (onVerificationStatusChange) {
      onVerificationStatusChange(true);
    }

    try {
      // Verify OTP (registration should already be done)
      await verifyEmailWithOTP(email, otpCode);

      // Close popup on success
      if (onVerificationSuccess) {
        onVerificationSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Invalid') || error.message.includes('expired')) {
          setOtpError('Invalid or expired OTP. Please try again.');
        } else if (error.message.includes('not found') || error.message.includes('exist')) {
          setOtpError('Email not found. Please check your email address.');
        } else {
          setOtpError('Verification failed. Please try again.');
        }
      } else {
        setOtpError('An unexpected error occurred. Please try again.');
      }

      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
      setOTPVerificationInProgress(false);

      if (onVerificationStatusChange) {
        onVerificationStatusChange(false);
      }
    }
  };

  const handleResendEmail = async () => {
    if (isResending) return;

    setIsResending(true);
    setOtpError('');

    try {
      await resendEmailVerification(email);
      setTimeLeft(600);
    } catch (error) {
      if (error instanceof Error) {
        setOtpError(error.message);
      } else {
        setOtpError('Failed to resend verification email. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleOpenGmail = () => {
    window.open('https://gmail.com', '_blank');
  };

  const handleSkipVerification = () => {
    if (onSkipVerification) {
      onSkipVerification();
    }
    onClose();
  };

  const handleClosePopup = () => {
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    registrationAttemptedRef.current = false;
    setIsRegistered(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-sm bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6 text-white relative">
          <button
            onClick={handleClosePopup}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Verify Email</h2>
            <p className="text-indigo-100 text-sm opacity-80">{email}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Mode Toggle */}
          <div className="flex rounded-xl bg-slate-700/30 p-1 mb-6">
            <button
              onClick={() => setVerificationMode('otp')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                verificationMode === 'otp'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-blue-100/60 hover:text-blue-100'
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setVerificationMode('magic')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                verificationMode === 'magic'
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-blue-100/60 hover:text-blue-100'
              }`}
            >
              Link
            </button>
          </div>

          {verificationMode === 'otp' ? (
            /* OTP Mode */
            <div className="space-y-6">
              <div>
                <div className="flex justify-center space-x-3 mb-4" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-lg font-bold bg-slate-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                        otpError
                          ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-slate-600/30 focus:border-indigo-400 focus:ring-indigo-400/20'
                      }`}
                      disabled={isVerifying}
                    />
                  ))}
                </div>

                {/* Error Display */}
                {otpError && (
                  <div className="flex items-center justify-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{otpError}</span>
                  </div>
                )}
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-blue-100/50" />
                <span className={`text-sm ${timeLeft < 60 ? 'text-red-400' : 'text-blue-100/70'}`}>
                  {timeLeft > 0 ? formatTime(timeLeft) : 'Expired'}
                </span>
              </div>

              {isVerifying && (
                <div className="flex justify-center">
                  <LoadingSpinner size="sm" message="Verifying..." />
                </div>
              )}
            </div>
          ) : (
            /* Magic Link Mode */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Check Your Email</h3>
                <p className="text-blue-100/70 text-sm">Click the verification link to continue</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 mt-8">
            <button
              onClick={handleResendEmail}
              disabled={isResending || timeLeft > 540}
              className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                isResending || timeLeft > 540
                  ? 'bg-slate-700/20 text-blue-100/40 cursor-not-allowed'
                  : 'bg-slate-700/50 text-blue-100 hover:bg-slate-600/60'
              }`}
            >
              {isResending ? (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                `Resend ${timeLeft > 540 ? `(${Math.ceil((timeLeft - 540) / 60)}m)` : ''}`
              )}
            </button>

            <button
              onClick={handleOpenGmail}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Open Email</span>
            </button>

            <button
              onClick={handleSkipVerification}
              className="w-full text-blue-100/60 hover:text-blue-100/80 font-medium py-2 text-sm transition-all"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPopup;
