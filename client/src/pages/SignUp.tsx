import { Eye, EyeOff, Github } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
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

              <form onSubmit={handleSubmit} className="space-y-3 flex-1">
                <div>
                  <label htmlFor="name" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all text-sm"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all text-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all text-sm"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-100/60 hover:text-blue-100 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all text-sm"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-100/60 hover:text-blue-100 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mt-4 text-sm"
                >
                  Create Account
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
