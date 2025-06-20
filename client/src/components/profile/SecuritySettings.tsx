import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Trash2, X } from 'lucide-react';
import type { ChangePasswordFormData } from '../../lib/validations';
import { changePasswordSchema } from '../../lib/validations';
import LoadingSpinner from '../ui/LoadingSpinner';
import type { User as UserType } from '../../types/auth';

interface SecuritySettingsProps {
  user: UserType;
  changePassword: (data: ChangePasswordFormData) => Promise<void>;
  deleteAccount: (password?: string) => Promise<void>;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ user, changePassword, deleteAccount }) => {
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Delete account states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');

  // Password form
  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handlePasswordChange = async (data: ChangePasswordFormData) => {
    try {
      setIsLoading(true);
      await changePassword(data);
      setIsChangingPassword(false);
      passwordForm.reset();
    } catch (_error) {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirmDeleteText.toLowerCase() !== 'delete my account') {
      return;
    }

    const isOAuthUser = user?.authProvider !== 'local';
    if (!isOAuthUser && !deletePassword.trim()) {
      return;
    }

    try {
      const password = isOAuthUser ? undefined : deletePassword;
      await deleteAccount(password);
      navigate('/');
    } catch (_error) {
      // Error handled by auth context
    } finally {
      setShowDeleteModal(false);
      setDeletePassword('');
      setConfirmDeleteText('');
      setShowDeletePassword(false);
    }
  };

  return (
    <>
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
                  <p className="mt-1 text-sm text-red-400">{passwordForm.formState.errors.currentPassword.message}</p>
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
                  <p className="mt-1 text-sm text-red-400">{passwordForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 disabled:opacity-50 transition-all duration-300"
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
            <div className="space-y-6">
              <div>
                <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Password</label>
                <p className="text-sm text-blue-100/70">••••••••••••</p>
                <p className="text-xs text-blue-100/50 mt-1">Last updated: 2 weeks ago</p>
              </div>
              <div>
                <label className="block text-blue-100/90 font-medium mb-1.5 text-sm">Two-Factor Authentication</label>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                    Disabled
                  </span>
                  <button className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="border-t border-red-500/20 pt-6">
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                  <h4 className="text-red-400 font-medium mb-2 text-sm">Danger Zone</h4>
                  <p className="text-red-300/70 text-xs mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="inline-flex items-center px-3 py-2 border border-red-500/50 rounded-lg text-sm font-medium text-red-400 bg-red-500/20 hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-red-500/30 p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Delete Account</h3>
              </div>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword('');
                  setConfirmDeleteText('');
                  setShowDeletePassword(false);
                }}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-blue-100/70" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                <h4 className="text-red-400 font-medium mb-2">⚠️ This action cannot be undone</h4>
                <p className="text-red-300/80 text-sm">
                  This will permanently delete your account and remove all your data from our servers. You will not be
                  able to recover your account or any associated data.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-blue-100/90 font-medium mb-2 text-sm">
                    Type <span className="text-red-400 font-semibold">delete my account</span> to confirm:
                  </label>
                  <input
                    type="text"
                    value={confirmDeleteText}
                    onChange={(e) => setConfirmDeleteText(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600/50 focus:border-red-400/50 focus:ring-red-400/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm"
                    placeholder="delete my account"
                  />
                </div>

                {user?.authProvider === 'local' && (
                  <div>
                    <label className="block text-blue-100/90 font-medium mb-2 text-sm">
                      Enter your current password:
                    </label>
                    <div className="relative">
                      <input
                        type={showDeletePassword ? 'text' : 'password'}
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600/50 focus:border-red-400/50 focus:ring-red-400/20 rounded-lg px-4 py-2.5 text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 transition-all text-sm pr-10"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowDeletePassword(!showDeletePassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-100/60 hover:text-blue-100 transition-colors"
                      >
                        {showDeletePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {user?.authProvider !== 'local' && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-300 text-sm">
                      You signed in with <span className="font-semibold capitalize">{user?.authProvider}</span>. No
                      password verification required.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDeleteAccount}
                disabled={
                  confirmDeleteText.toLowerCase() !== 'delete my account' ||
                  (user?.authProvider === 'local' && !deletePassword.trim()) ||
                  isLoading
                }
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isLoading ? 'Deleting...' : 'Delete Account'}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword('');
                  setConfirmDeleteText('');
                  setShowDeletePassword(false);
                }}
                className="px-4 py-2 border border-slate-600/50 rounded-lg text-blue-100/90 hover:bg-slate-700/50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecuritySettings;
