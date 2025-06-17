import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  Calendar,
  Camera,
  Crop,
  Edit2,
  Eye,
  EyeOff,
  LogOut,
  Mail,
  Save,
  Shield,
  Upload,
  User,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ChangePasswordFormData, UpdateProfileFormData } from '../lib/validations';
import { useAuth } from '../context/AuthContext';
import { changePasswordSchema, updateProfileSchema } from '../lib/validations';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile, changePassword, updateProfileImage } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile image states
  const [profileImage, setProfileImage] = useState<string | undefined>(
    user?.effectiveProfileImage || user?.profileImage,
  );

  // Update profile image when user changes
  React.useEffect(() => {
    setProfileImage(user?.effectiveProfileImage || user?.profileImage);
  }, [user?.effectiveProfileImage, user?.profileImage]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 50, y: 50, size: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    } catch (_error) {
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
    } catch (_error) {
      // Error is handled by the auth context (toast)
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (_error) {
      // Error is handled by the auth context (toast)
    }
  };

  // Image handling functions
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setCrop({ x: 50, y: 50, size: 364 }); // Reset crop area for new image
        setShowImageModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setCrop({ x: 50, y: 50, size: 200 }); // Reset crop area for new image
        setShowImageModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const cropImage = useCallback(async () => {
    if (!selectedImage || !canvasRef.current || !imageRef) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = async () => {
      // Set canvas size to desired output size
      const outputSize = 200;
      canvas.width = outputSize;
      canvas.height = outputSize;

      // Get the displayed image dimensions
      const displayWidth = imageRef.clientWidth;
      const displayHeight = imageRef.clientHeight;

      // Calculate the scale factors between displayed and actual image
      const scaleX = img.width / displayWidth;
      const scaleY = img.height / displayHeight;

      // Convert crop coordinates from display to actual image coordinates
      const actualCropX = crop.x * scaleX;
      const actualCropY = crop.y * scaleY;
      const actualCropSize = crop.size * Math.min(scaleX, scaleY);

      // Ensure crop area doesn't exceed image boundaries
      const finalX = Math.max(0, Math.min(actualCropX, img.width - actualCropSize));
      const finalY = Math.max(0, Math.min(actualCropY, img.height - actualCropSize));
      const finalSize = Math.min(actualCropSize, img.width - finalX, img.height - finalY);

      // Draw the cropped image to canvas
      ctx?.drawImage(
        img,
        finalX,
        finalY,
        finalSize,
        finalSize, // Source rectangle (crop area from actual image)
        0,
        0,
        outputSize,
        outputSize, // Destination rectangle (full canvas)
      );

      const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.9);
      setProfileImage(croppedImageUrl);
      setShowImageModal(false);
      setSelectedImage(null);

      // Update the profile image in the auth context
      try {
        await updateProfileImage(croppedImageUrl);
      } catch (_error) {
        // Error is handled by the auth context (toast)
      }
    };

    img.src = selectedImage;
  }, [selectedImage, crop, imageRef, updateProfileImage]);

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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg">
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
                {/* Profile Picture */}
                <div className="relative">
                  {user?.effectiveProfileImage || user?.profileImage || profileImage ? (
                    <img
                      src={user?.effectiveProfileImage || user?.profileImage || profileImage}
                      alt="Profile"
                      className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover ring-2 ring-indigo-500/50"
                    />
                  ) : (
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-0.5 -right-0.5 p-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg transition-colors sm:p-1.5"
                  >
                    <Camera className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                  </button>
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
              {/* Profile Picture Upload Section */}
              <div className="mb-6">
                <label className="block text-blue-100/90 font-medium mb-3 text-sm">Profile Picture</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging ? 'border-indigo-400 bg-indigo-500/10' : 'border-slate-600/50 hover:border-slate-500/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center space-y-3">
                    {user?.effectiveProfileImage || user?.profileImage || profileImage ? (
                      <img
                        src={user?.effectiveProfileImage || user?.profileImage || profileImage}
                        alt="Profile preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-blue-100/60" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-blue-100/70">
                        Drag and drop an image here, or{' '}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-indigo-400 hover:text-indigo-300 underline"
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-xs text-blue-100/50 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden file input */}
              <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />

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

        {/* Image Crop Modal */}
        {showImageModal && selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Crop Profile Picture</h3>
                <button
                  onClick={() => {
                    setShowImageModal(false);
                    setSelectedImage(null);
                    setCrop({ x: 50, y: 50, size: 200 });
                  }}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-blue-100/70" />
                </button>
              </div>

              <div className="mb-6 bg-slate-900 rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    ref={setImageRef}
                    src={selectedImage}
                    alt="Crop preview"
                    className="w-full h-96 object-contain"
                    draggable={false}
                  />
                  {/* Crop overlay */}
                  <div
                    className="absolute border-2 border-indigo-400 bg-indigo-400/20 cursor-move select-none"
                    style={{
                      left: `${crop.x}px`,
                      top: `${crop.y}px`,
                      width: `${crop.size}px`,
                      height: `${crop.size}px`,
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                      if (!rect || !imageRef) return;

                      const startX = e.clientX;
                      const startY = e.clientY;
                      const startCropX = crop.x;
                      const startCropY = crop.y;

                      const maxX = imageRef.clientWidth - crop.size;
                      const maxY = imageRef.clientHeight - crop.size;

                      const handleMouseMove = (e: MouseEvent) => {
                        const deltaX = e.clientX - startX;
                        const deltaY = e.clientY - startY;
                        const newX = Math.max(0, Math.min(maxX, startCropX + deltaX));
                        const newY = Math.max(0, Math.min(maxY, startCropY + deltaY));

                        setCrop({
                          ...crop,
                          x: newX,
                          y: newY,
                        });
                      };

                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };

                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    {/* Crop area border */}
                    <div className="absolute inset-0 border border-white/50 pointer-events-none" />

                    {/* Resize handle in bottom-right corner */}
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 bg-indigo-400 cursor-se-resize"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (!imageRef) return;

                        const startSize = crop.size;
                        const startX = e.clientX;
                        const startY = e.clientY;

                        const maxSize = Math.min(imageRef.clientWidth - crop.x, imageRef.clientHeight - crop.y);

                        const handleMouseMove = (e: MouseEvent) => {
                          const deltaX = e.clientX - startX;
                          const deltaY = e.clientY - startY;
                          const delta = Math.max(deltaX, deltaY);
                          const newSize = Math.max(50, Math.min(maxSize, startSize + delta));

                          setCrop({
                            ...crop,
                            size: newSize,
                          });
                        };

                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };

                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    >
                      <div className="w-full h-full bg-white/20 border border-white/50" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-100/90 mb-2">Crop Size</label>
                <input
                  type="range"
                  min="50"
                  max={imageRef ? Math.min(imageRef.clientWidth, imageRef.clientHeight) : 300}
                  value={crop.size}
                  onChange={(e) => {
                    const newSize = parseInt(e.target.value);
                    const maxX = imageRef ? imageRef.clientWidth - newSize : 0;
                    const maxY = imageRef ? imageRef.clientHeight - newSize : 0;

                    setCrop({
                      ...crop,
                      size: newSize,
                      x: Math.min(crop.x, maxX),
                      y: Math.min(crop.y, maxY),
                    });
                  }}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${imageRef ? ((crop.size - 50) / (Math.min(imageRef.clientWidth, imageRef.clientHeight) - 50)) * 100 : 0}%, #374151 ${imageRef ? ((crop.size - 50) / (Math.min(imageRef.clientWidth, imageRef.clientHeight) - 50)) * 100 : 0}%, #374151 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-blue-100/60 mt-1">
                  <span>Small</span>
                  <span>{crop.size}px</span>
                  <span>Large</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-sm text-blue-100/70 text-center">
                    Drag the crop area to position it, use the handle in the bottom-right to resize, or use the slider
                    above.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={cropImage}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                >
                  <Crop className="w-4 h-4 mr-2" />
                  Apply Crop
                </button>
                <button
                  onClick={() => {
                    setShowImageModal(false);
                    setSelectedImage(null);
                    setCrop({ x: 50, y: 50, size: 200 });
                  }}
                  className="px-4 py-2 border border-slate-600/50 rounded-lg text-blue-100/90 hover:bg-slate-700/50 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
