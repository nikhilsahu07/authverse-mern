import { ArrowRight, CheckCircle, Key, Lock, Shield, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingNavbar from '../components/FloatingNavbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <FloatingNavbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Secure Authentication
            <br />
            Made Simple
          </h1>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-blue-100/80 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            AuthVerse provides enterprise-grade authentication solutions with seamless integration, advanced security
            features, and unparalleled user experience for modern applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="w-full sm:w-auto border-2 border-blue-400/30 text-blue-200 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-blue-400/10 transition-all duration-300 font-semibold text-base sm:text-lg">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Everything you need for secure authentication
            </h2>
            <p className="text-lg sm:text-xl text-blue-100/70 max-w-3xl mx-auto px-4">
              Comprehensive security features designed to protect your users and simplify your development process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Multi-Factor Authentication</h3>
              <p className="text-blue-100/70 leading-relaxed text-sm sm:text-base">
                Advanced MFA with SMS, email, and authenticator app support. Protect accounts with multiple layers of
                security.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Enterprise Security</h3>
              <p className="text-blue-100/70 leading-relaxed text-sm sm:text-base">
                SOC 2 compliant with end-to-end encryption, advanced threat detection, and real-time security
                monitoring.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50 md:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Single Sign-On</h3>
              <p className="text-blue-100/70 leading-relaxed text-sm sm:text-base">
                Seamless SSO integration with popular identity providers. One login for all your applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-400">99.9%</div>
              <div className="text-blue-100/70 text-sm sm:text-base">Uptime SLA</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400">50M+</div>
              <div className="text-blue-100/70 text-sm sm:text-base">Authentications/Month</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400">10K+</div>
              <div className="text-blue-100/70 text-sm sm:text-base">Active Applications</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-400">24/7</div>
              <div className="text-blue-100/70 text-sm sm:text-base">Security Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Built with security at its core
            </h2>
            <p className="text-lg sm:text-xl text-blue-100/70 max-w-3xl mx-auto px-4">
              Industry-leading security standards and compliance certifications you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Zero-Trust Architecture</h3>
                  <p className="text-blue-100/70 text-sm sm:text-base">
                    Every request is verified and authenticated before granting access to resources.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                    Advanced Threat Detection
                  </h3>
                  <p className="text-blue-100/70 text-sm sm:text-base">
                    AI-powered anomaly detection identifies and blocks suspicious authentication attempts.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Compliance Ready</h3>
                  <p className="text-blue-100/70 text-sm sm:text-base">
                    SOC 2, GDPR, HIPAA, and other compliance standards built-in from day one.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-slate-700/50 order-1 lg:order-2">
              <Shield className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 text-indigo-400 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Enterprise-Grade Security</h3>
              <p className="text-blue-100/70 text-sm sm:text-base">Trusted by Fortune 500 companies worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12">
            Trusted by security professionals
          </h2>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-slate-700/50">
            <div className="flex justify-center mb-4 sm:mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-blue-100/90 mb-6 sm:mb-8 leading-relaxed">
              &quot;AuthVerse has transformed our authentication infrastructure. The security features are
              comprehensive, and the developer experience is exceptional. Our team can focus on building features
              instead of worrying about security.&quot;
            </blockquote>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <div className="font-semibold text-white text-sm sm:text-base">Alex Rodriguez</div>
                <div className="text-blue-100/70 text-xs sm:text-sm">CISO at SecureTech Inc.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to secure your application?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust AuthVerse for their authentication needs.
          </p>
          <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-semibold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105">
            Start Building Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-2 sm:py-3 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50">
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
