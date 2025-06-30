import { ArrowRight, Award, CheckCircle, Globe, Key, Lock, Shield, Star, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingNavbar from '../components/FloatingNavbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
      </div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

      <FloatingNavbar />

      {/* Hero Section - Optimized for viewport */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo Icon */}
          <div className="flex justify-center mb-6 sm:mb-8 mt-4 sm:mt-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 animate-pulse">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Secure Authentication
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-blue-100/80 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2">
            Enterprise-grade authentication with seamless integration, advanced security features, and unparalleled user
            experience for modern applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-10 sm:mb-14">
            <button className="group relative w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border border-blue-400/40 text-blue-200 px-6 sm:px-8 py-3 rounded-xl hover:bg-blue-400/10 hover:border-blue-400/60 transition-all duration-300 font-semibold text-sm sm:text-base backdrop-blur-sm">
              View Documentation
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-blue-200/60">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>50M+ Authentications</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Everything you need for secure authentication
            </h2>
            <p className="text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto">
              Comprehensive security features designed to protect your users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Feature Card 1 */}
            <div className="group relative bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-700/30 hover:border-slate-600/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Multi-Factor Authentication</h3>
                <p className="text-blue-100/70 leading-relaxed text-sm">
                  Advanced MFA with SMS, email, and authenticator app support. Multiple layers of security protection.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-700/30 hover:border-slate-600/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Enterprise Security</h3>
                <p className="text-blue-100/70 leading-relaxed text-sm">
                  SOC 2 compliant with end-to-end encryption and real-time security monitoring.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-700/30 hover:border-slate-600/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Single Sign-On</h3>
                <p className="text-blue-100/70 leading-relaxed text-sm">
                  Seamless SSO integration with popular identity providers. One login for all applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/20 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-2 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-blue-100/70 text-sm">Uptime SLA</div>
            </div>
            <div className="space-y-2 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                50M+
              </div>
              <div className="text-blue-100/70 text-sm">Authentications/Month</div>
            </div>
            <div className="space-y-2 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <div className="text-blue-100/70 text-sm">Active Applications</div>
            </div>
            <div className="space-y-2 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-blue-100/70 text-sm">Security Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Built with security at its core
            </h2>
            <p className="text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto">
              Industry-leading security standards and compliance certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="flex items-start space-x-4 group">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Zero-Trust Architecture</h3>
                  <p className="text-blue-100/70 text-sm">
                    Every request is verified and authenticated before granting access to resources.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Advanced Threat Detection</h3>
                  <p className="text-blue-100/70 text-sm">
                    AI-powered anomaly detection identifies and blocks suspicious authentication attempts.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Compliance Ready</h3>
                  <p className="text-blue-100/70 text-sm">
                    SOC 2, GDPR, HIPAA, and other compliance standards built-in from day one.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-slate-800/60 to-blue-900/60 backdrop-blur-xl rounded-3xl p-8 text-center border border-slate-700/30 shadow-2xl">
                <div className="relative">
                  <Shield className="w-24 h-24 text-indigo-400 mx-auto mb-6 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Enterprise-Grade Security</h3>
                <p className="text-blue-100/70">Trusted by Fortune 500 companies worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8">
            Trusted by security professionals
          </h2>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
            <div className="relative">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl text-blue-100/90 mb-8 leading-relaxed">
                &quot;AuthVerse has transformed our authentication infrastructure. The security features are
                comprehensive, and the developer experience is exceptional.&quot;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Alex Rodriguez</div>
                  <div className="text-blue-100/70 text-sm">CISO at SecureTech Inc.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to secure your application?
          </h2>
          <p className="text-base sm:text-lg text-blue-100/70 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust AuthVerse for their authentication needs.
          </p>
          <button className="group bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-2xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold text-base sm:text-lg shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 relative overflow-hidden">
            <span className="relative z-10">Start Building Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-slate-700/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">AuthVerse</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-blue-200/70">
              <p>&copy; {new Date().getFullYear()} AuthVerse Inc. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link to="/privacy-policy" className="hover:text-blue-200 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="hover:text-blue-200 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
