import { Activity, ChevronRight, Key, Search, Shield, Users } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-100/70">
              <span className="text-indigo-400 text-sm">Analytics</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-sm">User Activity</span>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-blue-100/60" />
              </div>
              <input
                type="text"
                placeholder="Search users, events..."
                className="w-72 bg-slate-700/50 border border-slate-600/50 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-blue-100/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent"
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold mt-3 text-white">Authentication Dashboard</h1>
        </div>

        {/* Content Area */}
        <div className="p-4 space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-100/70 text-xs">Total Users</div>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-white">12,847</div>
              <div className="text-green-400 text-xs mt-1">↗ +15.3%</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-100/70 text-xs">Active Sessions</div>
                <Activity className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">3,249</div>
              <div className="text-green-400 text-xs mt-1">↗ +8.7%</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-100/70 text-xs">Failed Logins</div>
                <Shield className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-white">127</div>
              <div className="text-red-400 text-xs mt-1">↘ -12.1%</div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="text-blue-100/70 text-xs">API Requests</div>
                <Key className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">89.2K</div>
              <div className="text-green-400 text-xs mt-1">↗ +23.4%</div>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-5 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
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
            <div className="h-64 bg-slate-700/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-600/50">
              <div className="text-blue-100/70 text-center">
                <div className="text-4xl mb-3">🔐</div>
                <div className="text-base text-white">Authentication Analytics</div>
                <div className="text-xs mt-2">Login attempts, success rates, and security metrics</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    className="flex items-center justify-between py-2 border-b border-slate-600/50 last:border-b-0"
                  >
                    <div className="flex-1">
                      <div className="text-white text-xs">{item.user}</div>
                      <div className="text-blue-100/60 text-xs">
                        {item.time} • {item.location}
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                      className={`w-2 h-2 rounded-full mt-1.5 ${
                        alert.type === 'warning'
                          ? 'bg-yellow-400'
                          : alert.type === 'success'
                            ? 'bg-green-400'
                            : 'bg-blue-400'
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="text-white text-xs">{alert.message}</div>
                      <div className="text-blue-100/60 text-xs">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
