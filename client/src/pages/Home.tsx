import { ArrowRight, CheckCircle, Key, Lock, Shield, Star, Users } from 'lucide-react';
import FloatingNavbar from '../components/FloatingNavbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <FloatingNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight">
            Secure Authentication
            <br />
            Made Simple
          </h1>
          <p className="text-xl text-blue-100/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            AuthVerse provides enterprise-grade authentication solutions with seamless integration, advanced security
            features, and unparalleled user experience for modern applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-8 py-4 rounded-2xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-blue-400/30 text-blue-200 px-8 py-4 rounded-2xl hover:bg-blue-400/10 transition-all duration-300 font-semibold text-lg">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything you need for secure authentication</h2>
            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto">
              Comprehensive security features designed to protect your users and simplify your development process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Multi-Factor Authentication</h3>
              <p className="text-blue-100/70 leading-relaxed">
                Advanced MFA with SMS, email, and authenticator app support. Protect accounts with multiple layers of
                security.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
              <p className="text-blue-100/70 leading-relaxed">
                SOC 2 compliant with end-to-end encryption, advanced threat detection, and real-time security
                monitoring.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Key className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Single Sign-On</h3>
              <p className="text-blue-100/70 leading-relaxed">
                Seamless SSO integration with popular identity providers. One login for all your applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-400 mb-2">99.9%</div>
              <div className="text-blue-100/70">Uptime SLA</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50M+</div>
              <div className="text-blue-100/70">Authentications/Month</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-blue-100/70">Active Applications</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-400 mb-2">24/7</div>
              <div className="text-blue-100/70">Security Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Built with security at its core</h2>
            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto">
              Industry-leading security standards and compliance certifications you can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Zero-Trust Architecture</h3>
                  <p className="text-blue-100/70">
                    Every request is verified and authenticated before granting access to resources.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Advanced Threat Detection</h3>
                  <p className="text-blue-100/70">
                    AI-powered anomaly detection identifies and blocks suspicious authentication attempts.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Compliance Ready</h3>
                  <p className="text-blue-100/70">
                    SOC 2, GDPR, HIPAA, and other compliance standards built-in from day one.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 rounded-3xl p-8 text-center border border-slate-700/50">
              <Shield className="w-32 h-32 text-indigo-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise-Grade Security</h3>
              <p className="text-blue-100/70">Trusted by Fortune 500 companies worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Trusted by security professionals</h2>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-700/50">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl text-blue-100/90 mb-8 leading-relaxed">
              &quot;AuthVerse has transformed our authentication infrastructure. The security features are
              comprehensive, and the developer experience is exceptional. Our team can focus on building features
              instead of worrying about security.&quot;
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Alex Rodriguez</div>
                <div className="text-blue-100/70">CISO at SecureTech Inc.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to secure your application?</h2>
          <p className="text-xl text-blue-100/70 mb-8">
            Join thousands of developers who trust AuthVerse for their authentication needs.
          </p>
          <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-12 py-4 rounded-2xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-semibold text-xl shadow-lg hover:shadow-xl">
            Start Building Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
