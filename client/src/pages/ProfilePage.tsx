import React from 'react';
import { ArrowLeft, Camera, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileInformation from '../components/profile/ProfileInformation';
import SecuritySettings from '../components/profile/SecuritySettings';

const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile, changePassword, updateProfileImage, deleteAccount } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (_error) {
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
                  {user?.effectiveProfileImage || user?.profileImage ? (
                    <img
                      src={user?.effectiveProfileImage || user?.profileImage}
                      alt="Profile"
                      className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover ring-2 ring-indigo-500/50"
                    />
                  ) : (
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 p-1 bg-indigo-500 text-white rounded-full shadow-lg sm:p-1.5">
                    <Camera className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                  </div>
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
          <ProfileInformation user={user} updateProfile={updateProfile} updateProfileImage={updateProfileImage} />

          {/* Security Settings */}
          <SecuritySettings user={user} changePassword={changePassword} deleteAccount={deleteAccount} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
