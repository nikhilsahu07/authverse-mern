import { ArrowLeft, Eye, Lock, Shield, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
              <p className="text-blue-200/70">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700/50">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-indigo-400" />
                Information We Collect
              </h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  At AuthVerse, we are committed to protecting your privacy. We collect only the essential information
                  needed to provide our authentication services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Email Address:</strong> Used for account creation, authentication, and important service
                    communications
                  </li>
                  <li>
                    <strong>Full Name:</strong> Used for personalization and account identification
                  </li>
                  <li>
                    <strong>Profile Image:</strong> Optional profile picture to enhance your user experience
                  </li>
                  <li>
                    <strong>Authentication Data:</strong> Encrypted passwords, login timestamps, and security tokens
                  </li>
                  <li>
                    <strong>Device Information:</strong> IP address, browser type, and device identifiers for security
                    purposes
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <UserCheck className="w-6 h-6 mr-3 text-green-400" />
                How We Use Your Information
              </h2>
              <div className="text-blue-100/80 space-y-4">
                <p>We use your personal information exclusively for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Providing secure authentication and account management services</li>
                  <li>Personalizing your user experience within our platform</li>
                  <li>Sending essential service notifications and security alerts</li>
                  <li>Detecting and preventing fraudulent activities and security threats</li>
                  <li>Improving our services based on usage patterns and feedback</li>
                  <li>Complying with legal obligations and responding to lawful requests</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-yellow-400" />
                Data Protection & Security
              </h2>
              <div className="text-blue-100/80 space-y-4">
                <p>We implement industry-leading security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using
                    AES-256
                  </li>
                  <li>
                    <strong>Access Controls:</strong> Strict role-based access controls limit data access to authorized
                    personnel only
                  </li>
                  <li>
                    <strong>Regular Audits:</strong> We conduct regular security audits and penetration testing
                  </li>
                  <li>
                    <strong>SOC 2 Compliance:</strong> Our infrastructure meets SOC 2 Type II standards
                  </li>
                  <li>
                    <strong>Zero-Knowledge Architecture:</strong> We cannot access your passwords or sensitive
                    authentication data
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing & Third Parties</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in these limited circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety, or that of our users</li>
                  <li>
                    With trusted service providers who assist in our operations (under strict confidentiality
                    agreements)
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights & Choices</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Update or correct inaccurate personal information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information (subject to legal
                    obligations)
                  </li>
                  <li>
                    <strong>Portability:</strong> Export your data in a machine-readable format
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to certain types of data processing
                  </li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:heynikhilsahu@gmail.com" className="text-indigo-400 hover:text-indigo-300">
                    heynikhilsahu@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  We retain your personal information only as long as necessary to provide our services and comply with
                  legal obligations:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Active account data is retained while your account remains active</li>
                  <li>Deleted accounts are purged within 30 days, except where required by law</li>
                  <li>Security logs are retained for 1 year for security and fraud prevention</li>
                  <li>Billing information is retained for 7 years for tax and accounting purposes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Cookies & Tracking</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>We use essential cookies and similar technologies to provide our services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Authentication Cookies:</strong> To maintain your login session securely
                  </li>
                  <li>
                    <strong>Security Cookies:</strong> To detect and prevent security threats
                  </li>
                  <li>
                    <strong>Functional Cookies:</strong> To remember your preferences and settings
                  </li>
                </ul>
                <p>We do not use advertising or tracking cookies.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>We may update this privacy policy from time to time. When we do, we will:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Update the &quot;Last updated&quot; date at the top of this policy</li>
                  <li>Notify you via email of any material changes</li>
                  <li>Provide a prominent notice on our website</li>
                </ul>
                <p>
                  Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
                <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                  <p>
                    <strong>Email:</strong> heynikhilsahu@gmail.com
                  </p>
                  <p>
                    <strong>Address:</strong> Ranchi, Jharkhand, India
                  </p>
                  <p>
                    <strong>Response Time:</strong> We will respond to privacy inquiries within 30 days
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
