import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Circle,
  Edit2,
  Key,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  User,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = ({ isMobileOpen = false, onMobileClose }: SidebarProps) => {
  const navigate = useNavigate();
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user, logout } = useAuth();

  // Determine if sidebar should be expanded (either not collapsed or being hovered)
  const isExpanded = !isCollapsed || isHovered;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const analyticsItems = [
    { title: 'Overview', path: '/dashboard/analytics/overview' },
    { title: 'Login Attempts', path: '/dashboard/analytics/logins' },
    {
      title: 'User Activity',
      path: '/dashboard/analytics/activity',
      active: true,
    },
  ];

  const securityItems = [
    { title: 'Multi-Factor Auth', path: '/dashboard/security/mfa' },
    { title: 'API Keys', path: '/dashboard/security/keys' },
    { title: 'Audit Logs', path: '/dashboard/security/logs' },
  ];

  const settingsItems = [
    { title: 'General', path: '/dashboard/settings/general' },
    { title: 'Team', path: '/dashboard/settings/team' },
    { title: 'Billing', path: '/dashboard/settings/billing' },
  ];

  const SidebarContent = () => (
    <div
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } bg-slate-900 text-white h-full transition-all duration-300 ease-in-out flex flex-col shadow-2xl lg:relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div
        className={`${isExpanded ? 'p-4' : 'p-3'} border-b border-slate-800 transition-all duration-300 ease-in-out`}
      >
        <div className={`flex ${isExpanded ? 'items-center justify-between' : 'flex-col space-y-3 items-center'}`}>
          <Link
            to="/"
            className={`flex ${isExpanded ? 'items-center space-x-3' : 'justify-center'} hover:opacity-80 transition-opacity duration-300`}
            onClick={handleNavClick}
          >
            <img src="/authverse.png" alt="AuthVerse" className="w-8 h-8 object-contain transition-all duration-300" />
            {isExpanded && <span className="text-xl font-semibold">AuthVerse</span>}
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="hidden lg:flex p-2 hover:bg-slate-800 rounded-lg transition-all duration-300 ease-in-out items-center justify-center hover:scale-110"
          >
            <div className="transition-transform duration-300 ease-in-out">
              {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </div>
          </button>

          {/* Mobile Close Button */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-all duration-300 ease-in-out"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Welcome Section */}
      <div
        onClick={() => {
          navigate('/profile');
          handleNavClick();
        }}
        className={`${
          isExpanded ? 'p-4' : 'p-2'
        } border-b border-slate-800/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-slate-800/50`}
      >
        <div
          className={`flex items-center ${
            isExpanded ? 'space-x-3' : 'justify-center'
          } transition-all duration-300 ease-in-out`}
        >
          <div className="relative w-10 h-10 transition-all duration-300">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50 transition-all duration-300"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center transition-all duration-300">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <div
            className={`transition-all duration-300 ease-in-out ${
              isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 h-0 overflow-hidden'
            }`}
          >
            <div className="text-white font-medium text-sm">Welcome back!</div>
            <div className="text-blue-100/70 text-sm flex items-center gap-2">
              {user?.firstName} {user?.lastName}
              <Edit2 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div
        className={`flex-1 ${isExpanded ? 'p-4' : 'p-2'} transition-all duration-300 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-track-transparent hover:scrollbar-thumb-slate-600/70`}
      >
        <div className="mb-6 pr-1">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isExpanded ? 'opacity-100 h-auto mb-3' : 'opacity-0 h-0 mb-0 overflow-hidden'
            }`}
          >
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">MAIN MENU</h3>
          </div>

          {/* Dashboard */}
          <Link
            to="/dashboard"
            onClick={handleNavClick}
            className={`flex items-center ${
              isExpanded ? 'space-x-3 px-3 py-2' : 'justify-center p-3 mb-2'
            } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
            title={!isExpanded ? 'Dashboard' : ''}
          >
            <LayoutDashboard className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
            <span
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
              }`}
            >
              Dashboard
            </span>
          </Link>

          {/* Analytics */}
          <div className="mt-2">
            <button
              onClick={() => isExpanded && setAnalyticsOpen(!analyticsOpen)}
              className={`flex items-center ${
                isExpanded ? 'justify-between w-full px-3 py-2' : 'justify-center p-3 mb-2 w-full'
              } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
              title={!isExpanded ? 'Analytics' : ''}
            >
              <div className={`flex items-center ${isExpanded ? 'space-x-3' : ''} transition-all duration-300`}>
                <BarChart3 className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
                <span
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
                  }`}
                >
                  Analytics
                </span>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
                }`}
              >
                {analyticsOpen ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300" />
                )}
              </div>
            </button>

            <div
              className={`ml-8 mt-1 space-y-1 transition-all duration-300 ease-in-out ${
                analyticsOpen && isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              {analyticsItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 ${
                    item.active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Circle className="w-2 h-2 fill-current flex-shrink-0" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="mt-2">
            <button
              onClick={() => isExpanded && setSecurityOpen(!securityOpen)}
              className={`flex items-center ${
                isExpanded ? 'justify-between w-full px-3 py-2' : 'justify-center p-3 mb-2 w-full'
              } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
              title={!isExpanded ? 'Security' : ''}
            >
              <div className={`flex items-center ${isExpanded ? 'space-x-3' : ''} transition-all duration-300`}>
                <Shield className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
                <span
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
                  }`}
                >
                  Security
                </span>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
                }`}
              >
                {securityOpen ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300" />
                )}
              </div>
            </button>

            <div
              className={`ml-8 mt-1 space-y-1 transition-all duration-300 ease-in-out ${
                securityOpen && isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              {securityItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <Circle className="w-2 h-2 fill-current flex-shrink-0" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Users */}
          <Link
            to="/dashboard/users"
            onClick={handleNavClick}
            className={`flex items-center ${
              isExpanded ? 'space-x-3 px-3 py-2' : 'justify-center p-3 mb-2'
            } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group mt-2`}
            title={!isExpanded ? 'Users' : ''}
          >
            <Users className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
            <span
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
              }`}
            >
              Users
            </span>
          </Link>

          {/* API Keys */}
          <Link
            to="/dashboard/api-keys"
            onClick={handleNavClick}
            className={`flex items-center ${
              isExpanded ? 'space-x-3 px-3 py-2' : 'justify-center p-3 mb-2'
            } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group mt-2`}
            title={!isExpanded ? 'API Keys' : ''}
          >
            <Key className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
            <span
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
              }`}
            >
              API Keys
            </span>
          </Link>
        </div>

        {/* Settings Section */}
        <div className="mb-6 pr-1">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isExpanded ? 'opacity-100 h-auto mb-3' : 'opacity-0 h-0 mb-0 overflow-hidden'
            }`}
          >
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">SETTINGS</h3>
          </div>

          {/* Settings */}
          <div>
            <button
              onClick={() => isExpanded && setSettingsOpen(!settingsOpen)}
              className={`flex items-center ${
                isExpanded ? 'justify-between w-full px-3 py-2' : 'justify-center p-3 mb-2 w-full'
              } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
              title={!isExpanded ? 'Settings' : ''}
            >
              <div className={`flex items-center ${isExpanded ? 'space-x-3' : ''} transition-all duration-300`}>
                <Settings className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
                <span
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
                  }`}
                >
                  Settings
                </span>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
                }`}
              >
                {settingsOpen ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300" />
                )}
              </div>
            </button>

            <div
              className={`ml-8 mt-1 space-y-1 transition-all duration-300 ease-in-out ${
                settingsOpen && isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              {settingsItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  onClick={handleNavClick}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <Circle className="w-2 h-2 fill-current flex-shrink-0" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Logout */}
      <div
        className={`${isExpanded ? 'p-4' : 'p-2'} border-t border-slate-800/50 transition-all duration-300 ease-in-out`}
      >
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            isExpanded ? 'space-x-3 px-3 py-2 w-full' : 'justify-center p-3 w-full'
          } rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 ease-in-out hover:scale-105 group`}
          title={!isExpanded ? 'Logout' : ''}
        >
          <LogOut className="w-6 h-6 flex-shrink-0 transition-all duration-300" />
          <span
            className={`transition-all duration-300 ease-in-out ${
              isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0 overflow-hidden'
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );

  // Mobile Sidebar (overlay)
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return (
      <>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
            <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw]">
              <SidebarContent />
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar (static)
  return (
    <div className="hidden lg:block sticky top-0 h-screen">
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
