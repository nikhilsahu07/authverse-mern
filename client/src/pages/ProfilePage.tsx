import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Edit2, Eye, EyeOff, LogOut, Mail, Save, Shield, User, X } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No user data found</h2>
          <p className="text-blue-100/70">Please try logging in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 mb-6">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-blue-100/70">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-red-400/50 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50">
            <div className="px-6 py-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Profile Information</h2>
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

            <div className="px-6 py-4">
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

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 disabled:opacity-50 transition-all duration-300`}
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
                      className="inline-flex items-center px-4 py-2 border border-slate-600/50 rounded-lg shadow-sm text-sm font-medium text-blue-100/90 bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300"
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
                      <Mail className="h-4 w-4 text-blue-100/60 mr-2" />
                      <p className="text-sm text-white">{user.email}</p>
                      {user.isEmailVerified && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Details and Security */}
          <div className="space-y-6">
            {/* Account Details */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50">
              <div className="px-6 py-4 border-b border-slate-700/50">
                <h2 className="text-lg font-medium text-white">Account Details</h2>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Role</label>
                    <div className="mt-1 flex items-center">
                      <Shield className="h-4 w-4 text-blue-100/60 mr-2" />
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Account Status</label>
                    <div className="mt-1 flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${user.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-sm text-white">{user.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Member Since</label>
                    <div className="mt-1 flex items-center">
                      <Calendar className="h-4 w-4 text-blue-100/60 mr-2" />
                      <p className="text-sm text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {user.lastLogin && (
                    <div>
                      <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Last Login</label>
                      <p className="mt-1 text-sm text-white">{new Date(user.lastLogin).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50">
              <div className="px-6 py-4 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-white">Security</h2>
                  {!isChangingPassword && (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="inline-flex items-center px-3 py-2 border border-slate-600/50 rounded-lg text-sm font-medium text-blue-100/90 bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300"
                    >
                      Change Password
                    </button>
                  )}
                </div>
              </div>

              <div className="px-6 py-4">
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
                          } rounded-lg px-4 py-2.5 pr-10 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-100/60 hover:text-blue-100 transition-colors"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                          } rounded-lg px-4 py-2.5 pr-10 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-100/60 hover:text-blue-100 transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                          } rounded-lg px-4 py-2.5 pr-10 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-100/60 hover:text-blue-100 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-400">
                          {passwordForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 disabled:opacity-50 transition-all duration-300`}
                      >
                        {isLoading ? <LoadingSpinner size="sm" message="Changing..." /> : 'Change Password'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(false);
                          passwordForm.reset();
                        }}
                        className="inline-flex items-center px-4 py-2 border border-slate-600/50 rounded-lg shadow-sm text-sm font-medium text-blue-100/90 bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <p className="text-sm text-blue-100/60">
                      Keep your account secure by using a strong password and changing it regularly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
