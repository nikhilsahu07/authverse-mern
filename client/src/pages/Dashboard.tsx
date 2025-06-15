import { Activity, ChevronRight, Key, Menu, Search, Shield, Users } from 'lucide-react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button & Breadcrumb */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleMobileSidebar}
                className="lg:hidden p-2 text-blue-100/90 hover:text-blue-200 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-blue-100/70">
                <span className="text-indigo-400 text-sm">Analytics</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-sm">User Activity</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-blue-100/60" />
              </div>
              <input
                type="text"
                placeholder="Search users, events..."
                className="w-48 lg:w-72 bg-slate-700/50 border border-slate-600/50 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent"
              />
            </div>

            {/* Mobile Search Button */}
            <button className="sm:hidden p-2 text-blue-100/90 hover:text-blue-200 hover:bg-slate-700/50 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold mt-3 text-white">Authentication Dashboard</h1>
        </div>

        {/* Content Area */}
        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-100/70 text-xs">Total Users</div>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-white">12,847</div>
              <div className="text-green-400 text-xs mt-1">↗ +15.3%</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-100/70 text-xs">Active Sessions</div>
                <Activity className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">3,249</div>
              <div className="text-green-400 text-xs mt-1">↗ +8.7%</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-100/70 text-xs">Failed Logins</div>
                <Shield className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-white">127</div>
              <div className="text-red-400 text-xs mt-1">↘ -12.1%</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-100/70 text-xs">API Requests</div>
                <Key className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">89.2K</div>
              <div className="text-green-400 text-xs mt-1">↗ +23.4%</div>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
              <h2 className="text-lg font-semibold text-white">Authentication Analytics</h2>
              <div className="flex items-center space-x-3">
                <select className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>

            {/* Placeholder for chart */}
            <div className="h-48 sm:h-64 bg-slate-700/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-600/50">
              <div className="text-blue-100/70 text-center">
                <div className="text-3xl sm:text-4xl mb-3">🔐</div>
                <div className="text-base text-white">Authentication Analytics</div>
                <div className="text-xs sm:text-sm mt-2">Login attempts, success rates, and security metrics</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <h3 className="text-base font-semibold mb-3 text-white">Recent Login Attempts</h3>
              <div className="space-y-3">
                {[
                  {
                    time: '2 minutes ago',
                    user: 'john.doe@example.com',
                    status: 'success',
                    location: 'New York, US',
                  },
                  {
                    time: '5 minutes ago',
                    user: 'jane.smith@example.com',
                    status: 'success',
                    location: 'London, UK',
                  },
                  {
                    time: '12 minutes ago',
                    user: 'unknown@suspicious.com',
                    status: 'failed',
                    location: 'Unknown',
                  },
                  {
                    time: '18 minutes ago',
                    user: 'alex.wilson@example.com',
                    status: 'success',
                    location: 'Toronto, CA',
                  },
                  {
                    time: '25 minutes ago',
                    user: 'sarah.johnson@example.com',
                    status: 'mfa_required',
                    location: 'Sydney, AU',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-600/50 last:border-b-0 space-y-1 sm:space-y-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs truncate">{item.user}</div>
                      <div className="text-blue-100/60 text-xs">
                        {item.time} • {item.location}
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium self-start sm:self-auto ${
                        item.status === 'success'
                          ? 'bg-green-500/20 text-green-400'
                          : item.status === 'failed'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {item.status === 'success' ? 'Success' : item.status === 'failed' ? 'Failed' : 'MFA Required'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <h3 className="text-base font-semibold mb-3 text-white">Security Alerts</h3>
              <div className="space-y-3">
                {[
                  {
                    type: 'warning',
                    message: 'Multiple failed login attempts detected',
                    time: '10 minutes ago',
                  },
                  {
                    type: 'info',
                    message: 'New API key generated',
                    time: '1 hour ago',
                  },
                  {
                    type: 'success',
                    message: 'MFA enabled for 5 new users',
                    time: '2 hours ago',
                  },
                  {
                    type: 'warning',
                    message: 'Unusual login location detected',
                    time: '3 hours ago',
                  },
                  {
                    type: 'info',
                    message: 'Password policy updated',
                    time: '1 day ago',
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 py-2 border-b border-slate-600/50 last:border-b-0"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        alert.type === 'warning'
                          ? 'bg-yellow-400'
                          : alert.type === 'success'
                            ? 'bg-green-400'
                            : 'bg-blue-400'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs">{alert.message}</div>
                      <div className="text-blue-100/60 text-xs">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar (visible on mobile when search button is clicked) */}
          <div className="sm:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-blue-100/60" />
              </div>
              <input
                type="text"
                placeholder="Search users, events..."
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
