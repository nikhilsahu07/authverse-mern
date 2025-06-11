import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Circle,
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

const Sidebar = () => {
  const navigate = useNavigate();
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/');
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

  return (
    <div
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-slate-900 text-white h-screen transition-all duration-500 ease-in-out sticky top-0 flex flex-col shadow-2xl`}
    >
      {/* Header */}
      <div
        onClick={() => navigate('/')}
        className={`${isCollapsed ? 'p-3' : 'p-4'} border-b border-slate-800 transition-all duration-500 ease-in-out cursor-pointer`}
      >
        <div className={`flex ${isCollapsed ? 'flex-col space-y-3 items-center' : 'items-center justify-between'}`}>
          <Link
            to="/"
            className={`flex ${isCollapsed ? 'justify-center' : 'items-center space-x-3'} hover:opacity-80 transition-opacity duration-300`}
            onClick={(e) => e.stopPropagation()} // Prevent triggering parent onClick
          >
            <img
              src="/src/assets/authverse.png"
              alt="AuthVerse"
              className="w-8 h-8 object-contain transition-all duration-300"
            />
            {!isCollapsed && <span className="text-xl font-semibold">AuthVerse</span>}
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering parent onClick
              setIsCollapsed(!isCollapsed);
            }}
            className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:scale-110"
          >
            <div className="transition-transform duration-300 ease-in-out">
              {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </div>
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div
        onClick={() => navigate('/profile')}
        className={`${
          isCollapsed ? 'p-2' : 'p-4'
        } border-b border-slate-800/50 transition-all duration-500 ease-in-out cursor-pointer`}
      >
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'space-x-3'
          } transition-all duration-500 ease-in-out`}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center transition-all duration-300">
            <User className="w-5 h-5 text-white" />
          </div>
          <div
            className={`transition-all duration-500 ease-in-out ${
              isCollapsed ? 'opacity-0 scale-0 w-0 h-0 overflow-hidden' : 'opacity-100 scale-100'
            }`}
          >
            <div className="text-white font-medium text-sm">Welcome back!</div>
            <div className="text-blue-100/70 text-xs">John Anderson</div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div
        className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} transition-all duration-500 ease-in-out overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/70 [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-thumb]:duration-200`}
      >
        <div className="mb-6 pr-1">
          <div
            className={`transition-all duration-500 ease-in-out ${
              isCollapsed ? 'opacity-0 h-0 mb-0 overflow-hidden' : 'opacity-100 h-auto mb-3'
            }`}
          >
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">MAIN MENU</h3>
          </div>

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex items-center ${
              isCollapsed ? 'justify-center p-3 mb-2' : 'space-x-3 px-3 py-2'
            } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
            title={isCollapsed ? 'Dashboard' : ''}
          >
            <LayoutDashboard className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
            <span
              className={`transition-all duration-500 ease-in-out ${
                isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
              }`}
            >
              Dashboard
            </span>
          </Link>

          {/* Analytics */}
          <div className="mt-2">
            <button
              onClick={() => !isCollapsed && setAnalyticsOpen(!analyticsOpen)}
              className={`flex items-center ${
                isCollapsed ? 'justify-center p-3 mb-2 w-full' : 'justify-between w-full px-3 py-2'
              } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
              title={isCollapsed ? 'Analytics' : ''}
            >
              <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'} transition-all duration-300`}>
                <BarChart3 className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
                <span
                  className={`transition-all duration-500 ease-in-out ${
                    isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
                  }`}
                >
                  Analytics
                </span>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
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
              className={`ml-8 mt-1 space-y-1 transition-all duration-500 ease-in-out ${
                analyticsOpen && !isCollapsed ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              {analyticsItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
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
              onClick={() => !isCollapsed && setSecurityOpen(!securityOpen)}
              className={`flex items-center ${
                isCollapsed ? 'justify-center p-3 mb-2 w-full' : 'justify-between w-full px-3 py-2'
              } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
              title={isCollapsed ? 'Security' : ''}
            >
              <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'} transition-all duration-300`}>
                <Shield className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
                <span
                  className={`transition-all duration-500 ease-in-out ${
                    isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
                  }`}
                >
                  Security
                </span>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
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
              className={`ml-8 mt-1 space-y-1 transition-all duration-500 ease-in-out ${
                securityOpen && !isCollapsed ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              {securityItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
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
            className={`flex items-center ${
              isCollapsed ? 'justify-center p-3 mb-2' : 'space-x-3 px-3 py-2'
            } mt-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
            title={isCollapsed ? 'Users' : ''}
          >
            <Users className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
            <span
              className={`transition-all duration-500 ease-in-out ${
                isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
              }`}
            >
              Users
            </span>
          </Link>

          {/* API Keys */}
          <Link
            to="/dashboard/api-keys"
            className={`flex items-center ${
              isCollapsed ? 'justify-center p-3 mb-2' : 'space-x-3 px-3 py-2'
            } mt-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
            title={isCollapsed ? 'API Keys' : ''}
          >
            <Key className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
            <span
              className={`transition-all duration-500 ease-in-out ${
                isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
              }`}
            >
              API Keys
            </span>
          </Link>
        </div>

        {/* Settings */}
        <div>
          <div
            className={`transition-all duration-500 ease-in-out ${
              isCollapsed ? 'opacity-0 h-0 mb-0 overflow-hidden' : 'opacity-100 h-auto mb-3'
            }`}
          >
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">SETTINGS</h3>
          </div>

          <button
            onClick={() => !isCollapsed && setSettingsOpen(!settingsOpen)}
            className={`flex items-center ${
              isCollapsed ? 'justify-center p-3 mb-2 w-full' : 'justify-between w-full px-3 py-2'
            } rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
            title={isCollapsed ? 'Settings' : ''}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'} transition-all duration-300`}>
              <Settings className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:text-indigo-400" />
              <span
                className={`transition-all duration-500 ease-in-out ${
                  isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
                }`}
              >
                Settings
              </span>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out ${
                isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
              }`}
            >
              {settingsOpen ? (
                <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div
        className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-slate-800 transition-all duration-500 ease-in-out`}
      >
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            isCollapsed ? 'justify-center p-3 w-full' : 'space-x-3 w-full px-3 py-2'
          } rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 group`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:rotate-12" />
          <span
            className={`transition-all duration-500 ease-in-out ${
              isCollapsed ? 'opacity-0 scale-0 w-0 overflow-hidden' : 'opacity-100 scale-100'
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
