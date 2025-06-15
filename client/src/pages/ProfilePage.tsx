import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Calendar, Edit2, Eye, EyeOff, LogOut, Mail, Save, Shield, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ChangePasswordFormData, UpdateProfileFormData } from '../lib/validations';
import { useAuth } from '../context/AuthContext';
import { changePasswordSchema, updateProfileSchema } from '../lib/validations';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form
  const profileForm = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });

  // Password form
  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleProfileUpdate = async (data: UpdateProfileFormData) => {
    try {
      setIsLoading(true);
      await updateProfile(data);
      setIsEditingProfile(false);
    } catch (error) {
      // Error is handled by the auth context (toast)
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (data: ChangePasswordFormData) => {
    try {
      setIsLoading(true);
      await changePassword(data);
      setIsChangingPassword(false);
      passwordForm.reset();
    } catch (error) {
      // Error is handled by the auth context (toast)
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // Error is handled by the auth context (toast)
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">No user data found</h2>
          <p className="text-blue-100/70">Please try logging in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Header */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 mb-4 sm:mb-6">
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              {/* Logo and Title */}
              <Link to="/">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12  rounded-full flex items-center justify-center shadow-lg">
                    <img src="/authverse.png" alt="AuthVerse" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-white">AuthVerse</h1>
                    <p className="text-xs sm:text-sm text-blue-100/70">User Profile Settings</p>
                  </div>
                </div>
              </Link>

              {/* Back to Dashboard Button */}
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto justify-center sm:justify-start"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50 mb-4 sm:mb-6">
          <div className="px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-blue-100/70 text-sm sm:text-base">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 sm:px-4 py-2 border border-red-400/50 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Profile Information */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-white">Profile Information</h3>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="inline-flex items-center px-3 py-2 border border-slate-600/50 rounded-lg text-sm font-medium text-blue-100/90 bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4">
              {isEditingProfile ? (
                <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">First Name</label>
                      <input
                        {...profileForm.register('firstName')}
                        type="text"
                        className={`w-full bg-slate-700/50 border ${
                          profileForm.formState.errors.firstName
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                        } rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                      />
                      {profileForm.formState.errors.firstName && (
                        <p className="mt-1 text-sm text-red-400">{profileForm.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Last Name</label>
                      <input
                        {...profileForm.register('lastName')}
                        type="text"
                        className={`w-full bg-slate-700/50 border ${
                          profileForm.formState.errors.lastName
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                        } rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                      />
                      {profileForm.formState.errors.lastName && (
                        <p className="mt-1 text-sm text-red-400">{profileForm.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 disabled:opacity-50 transition-all duration-300`}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? <LoadingSpinner size="sm" message="Saving..." /> : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingProfile(false);
                        profileForm.reset();
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 border border-slate-600/50 rounded-lg shadow-sm text-sm font-medium text-blue-100/90 bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">First Name</label>
                      <p className="mt-1 text-sm text-white">{user.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Last Name</label>
                      <p className="mt-1 text-sm text-white">{user.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Email Address</label>
                    <div className="mt-1 flex items-center">
                      <Mail className="h-4 w-4 text-blue-100/60 mr-2 flex-shrink-0" />
                      <p className="text-sm text-white truncate">{user.email}</p>
                      {user.isEmailVerified && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Member Since</label>
                    <div className="mt-1 flex items-center">
                      <Calendar className="h-4 w-4 text-blue-100/60 mr-2 flex-shrink-0" />
                      <p className="text-sm text-white">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/50">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-white">Security Settings</h3>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="inline-flex items-center px-3 py-2 border border-slate-600/50 rounded-lg text-sm font-medium text-blue-100/90 bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </button>
                )}
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4">
              {isChangingPassword ? (
                <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Current Password</label>
                    <div className="relative">
                      <input
                        {...passwordForm.register('currentPassword')}
                        type={showCurrentPassword ? 'text' : 'password'}
                        className={`w-full bg-slate-700/50 border ${
                          passwordForm.formState.errors.currentPassword
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                        } rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm pr-10`}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-100/60 hover:text-blue-100 transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-400">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">New Password</label>
                    <div className="relative">
                      <input
                        {...passwordForm.register('newPassword')}
                        type={showNewPassword ? 'text' : 'password'}
                        className={`w-full bg-slate-700/50 border ${
                          passwordForm.formState.errors.newPassword
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                        } rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm pr-10`}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-100/60 hover:text-blue-100 transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.newPassword && (
                      <p className="mt-1 text-sm text-red-400">{passwordForm.formState.errors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Confirm New Password</label>
                    <div className="relative">
                      <input
                        {...passwordForm.register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`w-full bg-slate-700/50 border ${
                          passwordForm.formState.errors.confirmPassword
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-600/50 focus:border-indigo-400/50 focus:ring-indigo-400/20'
                        } rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm pr-10`}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-100/60 hover:text-blue-100 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-400">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 disabled:opacity-50 transition-all duration-300`}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {isLoading ? <LoadingSpinner size="sm" message="Updating..." /> : 'Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        passwordForm.reset();
                        setShowCurrentPassword(false);
                        setShowNewPassword(false);
                        setShowConfirmPassword(false);
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 border border-slate-600/50 rounded-lg shadow-sm text-sm font-medium text-blue-100/90 bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Password</label>
                    <p className="text-sm text-blue-100/70">••••••••••••</p>
                    <p className="text-xs text-blue-100/50 mt-1">Last updated: 2 weeks ago</p>
                  </div>
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">
                      Two-Factor Authentication
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                        Disabled
                      </span>
                      <button className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
