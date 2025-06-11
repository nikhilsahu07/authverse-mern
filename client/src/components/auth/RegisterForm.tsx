import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Github } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPasswordStrength, registerSchema } from '../../lib/validations';
import type { RegisterFormData } from '../../lib/validations';
import LoadingSpinner from '../ui/LoadingSpinner';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');
  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = (score: number) => {
    if (score < 25) return 'bg-red-500';
    if (score < 50) return 'bg-yellow-500';
    if (score < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score: number) => {
    if (score < 25) return 'Weak';
    if (score < 50) return 'Fair';
    if (score < 75) return 'Good';
    return 'Strong';
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Form */}
          <div className="lg:w-3/5 p-5 lg:p-7">
            <div className="max-w-md mx-auto h-full flex flex-col">
              {/* Logo */}
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors mb-5"
              >
                <img src="/src/assets/authverse.png" alt="AuthVerse" className="w-7 h-7 object-contain" />
                <span className="text-lg font-bold">AuthVerse</span>
              </Link>

              <div className="mb-5 text-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Create Account</h1>
                <p className="text-blue-100/70 text-base">Join the secure authentication platform</p>
              </div>

              {/* Social Login */}
              <div className="mb-5">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {/* Google */}
                  <button className="group w-full inline-flex justify-center items-center py-2.5 px-3 rounded-lg border border-slate-600/50 bg-slate-700/50 backdrop-blur-sm text-white hover:bg-slate-600/50 transition-all duration-300 hover:scale-105">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>

                  {/* GitHub */}
                  <button className="group w-full inline-flex justify-center items-center py-2.5 px-3 rounded-lg border border-slate-600/50 bg-slate-700/50 backdrop-blur-sm text-white hover:bg-slate-600/50 transition-all duration-300 hover:scale-105">
                    <Github className="w-4 h-4" />
                  </button>

                  {/* Facebook */}
                  <button className="group w-full inline-flex justify-center items-center py-2.5 px-3 rounded-lg border border-slate-600/50 bg-slate-700/50 backdrop-blur-sm text-white hover:bg-slate-600/50 transition-all duration-300 hover:scale-105">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#1877F2"
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-slate-800/60 text-blue-100/60 font-medium">Or continue with email</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex-1">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      id="firstName"
                      autoComplete="given-name"
                      className={`w-full bg-slate-700/50 border ${
                        errors.firstName
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                      } rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                      placeholder="First name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      id="lastName"
                      autoComplete="family-name"
                      className={`w-full bg-slate-700/50 border ${
                        errors.lastName
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                      } rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                      placeholder="Last name"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    autoComplete="email"
                    className={`w-full bg-slate-700/50 border ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                    } rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      className={`w-full bg-slate-700/50 border ${
                        errors.password
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                      } rounded-lg px-4 py-2.5 pr-10 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-100/60 hover:text-blue-100 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-blue-100/60">Password strength:</span>
                        <span
                          className={`text-xs font-medium ${
                            passwordStrength.score < 25
                              ? 'text-red-400'
                              : passwordStrength.score < 50
                                ? 'text-yellow-400'
                                : passwordStrength.score < 75
                                  ? 'text-blue-400'
                                  : 'text-green-400'
                          }`}
                        >
                          {getStrengthText(passwordStrength.score)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-600/50 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
                          style={{ width: `${passwordStrength.score}%` }}
                        ></div>
                      </div>
                      {passwordStrength.feedback.length > 0 && (
                        <p className="mt-1 text-xs text-blue-100/60">Missing: {passwordStrength.feedback.join(', ')}</p>
                      )}
                    </div>
                  )}

                  {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      autoComplete="new-password"
                      className={`w-full bg-slate-700/50 border ${
                        errors.confirmPassword
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                      } rounded-lg px-4 py-2.5 pr-10 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-100/60 hover:text-blue-100 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg mt-4 text-sm ${
                    isSubmitting
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:from-indigo-600 hover:to-blue-600 hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <LoadingSpinner size="sm" message="Creating account..." className="py-1" />
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className="text-center text-sm">
                  <span className="text-blue-100/70">Already have an account? </span>
                  <Link to="/signin" className="text-blue-300 font-semibold hover:text-blue-200 transition-colors">
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="lg:w-2/5 bg-slate-900/40 backdrop-blur-sm p-5 lg:p-7 flex flex-col justify-center border-l border-slate-700/50">
            <div className="text-white">
              <h2 className="text-xl lg:text-2xl font-bold mb-5">Why Choose AuthVerse?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 bg-green-500/20 rounded-lg flex items-center justify-center mt-0.5">
                    <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base">Enterprise Security</h3>
                    <p className="text-blue-100/60 text-sm">Bank-level security with advanced encryption</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center mt-0.5">
                    <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base">Easy Integration</h3>
                    <p className="text-blue-100/60 text-sm">Simple APIs and comprehensive documentation</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 bg-purple-500/20 rounded-lg flex items-center justify-center mt-0.5">
                    <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base">24/7 Support</h3>
                    <p className="text-blue-100/60 text-sm">Round-the-clock technical assistance</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 bg-slate-800/60 backdrop-blur rounded-lg border border-slate-700/50">
                <h3 className="font-semibold text-base mb-2">Join 10,000+ developers</h3>
                <p className="text-blue-100/60 text-sm mb-3">
                  Start building secure applications with our trusted platform.
                </p>
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full border border-slate-700"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full border border-slate-700"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full border border-slate-700"></div>
                  <div className="w-6 h-6 bg-slate-600 rounded-full border border-slate-700 flex items-center justify-center">
                    <span className="text-xs font-bold">10K+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
