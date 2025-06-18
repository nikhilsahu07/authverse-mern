import { AlertTriangle, ArrowLeft, FileText, Scale, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Terms of Service</h1>
              <p className="text-blue-200/70">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700/50">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  By accessing and using AuthVerse (&quot;Service&quot;), you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
                <p>
                  These Terms of Service (&quot;Terms&quot;) govern your use of our authentication service operated by
                  AuthVerse Inc. (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-indigo-400" />
                Description of Service
              </h2>
              <div className="text-blue-100/80 space-y-4">
                <p>AuthVerse provides enterprise-grade authentication and identity management services including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>User authentication and authorization</li>
                  <li>Single Sign-On (SSO) capabilities</li>
                  <li>Multi-factor authentication (MFA)</li>
                  <li>Identity verification and management</li>
                  <li>Security monitoring and threat detection</li>
                  <li>API access for integration with third-party applications</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Account Registration</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>To use our service, you must create an account by providing:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>A valid email address</li>
                  <li>Your full name</li>
                  <li>A secure password meeting our security requirements</li>
                  <li>Optionally, a profile image</li>
                </ul>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all
                  activities that occur under your account. You must immediately notify us of any unauthorized use of
                  your account.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                Acceptable Use Policy
              </h2>
              <div className="text-blue-100/80 space-y-4">
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Transmit any harmful, illegal, defamatory, or offensive content</li>
                  <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
                  <li>Interfere with or disrupt the integrity or performance of the Service</li>
                  <li>Use the Service for any automated or bulk operations without prior approval</li>
                  <li>Reverse engineer, decompile, or attempt to extract source code</li>
                  <li>Use the Service to develop competing authentication solutions</li>
                  <li>Share your account credentials with unauthorized third parties</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>As a user of AuthVerse, you are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Providing accurate and complete information during registration</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>Promptly updating your information when it changes</li>
                  <li>Using strong, unique passwords for your account</li>
                  <li>Enabling multi-factor authentication when available</li>
                  <li>Reporting any security incidents or suspicious activities</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Respecting the intellectual property rights of others</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Service Availability</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>We strive to provide 99.9% uptime for our services. However, we reserve the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Perform scheduled maintenance with advance notice</li>
                  <li>Temporarily suspend service for emergency maintenance</li>
                  <li>Modify or discontinue features with reasonable notice</li>
                  <li>Implement service improvements and updates</li>
                </ul>
                <p>
                  We are not liable for any downtime, service interruptions, or data loss that may occur during
                  maintenance periods or due to circumstances beyond our control.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Data and Privacy</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p>Key privacy commitments:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We collect only necessary information for service provision</li>
                  <li>Your data is encrypted and stored securely</li>
                  <li>We do not sell or share your personal information with third parties</li>
                  <li>You have control over your data and can request deletion at any time</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive
                  property of AuthVerse Inc. and its licensors. The Service is protected by copyright, trademark, and
                  other laws.
                </p>
                <p>
                  You retain ownership of any content you provide through the Service, but grant us a limited license to
                  use such content solely for providing the Service to you.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Payment and Billing</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>For paid services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Fees are charged in advance on a recurring basis</li>
                  <li>All payments are non-refundable except as required by law</li>
                  <li>We may change pricing with 30 days advance notice</li>
                  <li>Accounts may be suspended for non-payment</li>
                  <li>You are responsible for applicable taxes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any
                  reason, including without limitation if you breach the Terms.
                </p>
                <p>You may terminate your account at any time by:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contacting our support team</li>
                  <li>Using account deletion features in your dashboard</li>
                  <li>Following the account closure process outlined in our documentation</li>
                </ul>
                <p>
                  Upon termination, your right to use the Service will cease immediately, and your data will be deleted
                  according to our data retention policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Scale className="w-6 h-6 mr-3 text-green-400" />
                Limitation of Liability
              </h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  In no event shall AuthVerse Inc., nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from your use of the Service.
                </p>
                <p>
                  Our total liability to you for all claims arising from or relating to the Service shall not exceed the
                  amount you paid us in the twelve months preceding the claim.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Indemnification</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  You agree to defend, indemnify, and hold harmless AuthVerse Inc. and its licensee and licensors, and
                  their employees, contractors, agents, officers and directors, from and against any and all claims,
                  damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to
                  attorney&apos;s fees).
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  These Terms shall be interpreted and governed by the laws of the State of Delaware, United States,
                  without regard to conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these Terms or your use of the Service shall be resolved through binding
                  arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                  try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>Your continued use of the Service after such changes constitutes acceptance of the new Terms.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <div className="text-blue-100/80 space-y-4">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                  <p>
                    <strong>Email:</strong> heynikhilsahu@gmail.com
                  </p>
                  <p>
                    <strong>Address:</strong> Ranchi, Jharkhand, India
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

export default TermsOfService;
