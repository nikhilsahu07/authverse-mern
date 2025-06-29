import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth, RequireGuest } from './components/common/ProtectedRoute';
import NotificationProvider from './components/common/notification';
import SignIn from './components/auth/LoginForm';
import SignUp from './components/auth/RegisterForm';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import OAuthSuccess from './pages/OAuthSuccess';
import EmailVerificationPage from './pages/EmailVerificationPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />

            {/* Guest-only routes */}
            <Route
              path="/signin"
              element={
                <RequireGuest>
                  <SignIn />
                </RequireGuest>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireGuest>
                  <SignUp />
                </RequireGuest>
              }
            />

            {/* OAuth callback route */}
            <Route path="/auth/oauth-success" element={<OAuthSuccess />} />

            {/* Email verification route */}
            <Route path="/auth/verify-email" element={<EmailVerificationPage />} />

            {/* Legal pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Toast notifications */}
          <NotificationProvider />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
