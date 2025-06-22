import { Resend } from 'resend';

// Email service configuration - Get fresh values each time
const FRONTEND_URL = process.env['FRONTEND_URL'] || 'http://localhost:5173';

let resend: Resend | null = null;

// Initialize Resend client
const initializeResend = (): Resend => {
  const { RESEND_API_KEY } = process.env;

  // Check for required API key

  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  if (!resend) {
    resend = new Resend(RESEND_API_KEY);
  }

  return resend;
};

export class EmailService {
  /**
   * Send email verification with OTP and magic link
   */
  static async sendVerificationEmail(email: string, firstName: string, otp: string, magicLink: string): Promise<void> {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - AuthVerse</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 40px 30px; }
            .otp-section { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
            .otp-code { font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: 8px; margin: 15px 0; }
            .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { background-color: #f1f5f9; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 AuthVerse</h1>
              <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Secure Authentication Platform</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${firstName}! 👋</h2>
              
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Welcome to AuthVerse! To complete your registration and secure your account, please verify your email address using one of the methods below:
              </p>
              
              <div class="otp-section">
                <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">🔢 Verification Code</h3>
                <p style="color: #ffffff; margin: 0 0 10px 0;">Enter this 6-digit code:</p>
                <div class="otp-code">${otp}</div>
                <p style="color: #ffffff; font-size: 14px; margin: 15px 0 0 0; opacity: 0.9;">
                  ⏱️ This code expires in 10 minutes
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #475569; margin-bottom: 15px;">Or click the button below for instant verification:</p>
                <a href="${magicLink}" class="button">
                  ✨ Verify Email Instantly
                </a>
              </div>
              
              <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <p style="color: #1e293b; font-weight: 600; margin: 0 0 10px 0;">🛡️ Security Tips:</p>
                <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
                  <li>Never share your verification code with anyone</li>
                  <li>This email was sent from a secure AuthVerse server</li>
                  <li>If you didn't create an account, please ignore this email</li>
                </ul>
              </div>
              
              <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin-top: 30px;">
                Having trouble? Copy and paste this link into your browser:<br>
                <span style="color: #3b82f6; word-break: break-all;">${magicLink}</span>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0; font-weight: 600;">AuthVerse Team</p>
              <p style="margin: 0; font-size: 13px;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      const resendClient = initializeResend();
      const fromEmail = process.env['RESEND_FROM_EMAIL'] || 'AuthVerse <onboarding@resend.dev>';

      const result = await resendClient.emails.send({
        from: fromEmail,
        to: email,
        subject: '🔐 Verify Your Email - AuthVerse',
        html: htmlContent,
      });

      if (!result.data) {
        throw new Error('Failed to send email via Resend');
      }
    } catch (error) {
      throw new Error(`Email sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(email: string, firstName: string, resetLink: string): Promise<void> {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - AuthVerse</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 40px 30px; }
            .button { display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { background-color: #f1f5f9; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 AuthVerse</h1>
              <p style="color: #fce7f3; margin: 10px 0 0 0; font-size: 16px;">Password Reset Request</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${firstName}! 👋</h2>
              
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                We received a request to reset your password for your AuthVerse account. Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" class="button">
                  🔑 Reset My Password
                </a>
              </div>
              
              <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <p style="color: #1e293b; font-weight: 600; margin: 0 0 10px 0;">🛡️ Security Notice:</p>
                <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
                  <li>This link expires in 1 hour for security</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>Your password won't change until you create a new one</li>
                </ul>
              </div>
              
              <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin-top: 30px;">
                Having trouble? Copy and paste this link into your browser:<br>
                <span style="color: #3b82f6; word-break: break-all;">${resetLink}</span>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0; font-weight: 600;">AuthVerse Team</p>
              <p style="margin: 0; font-size: 13px;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      const resendClient = initializeResend();
      const fromEmail = process.env['RESEND_FROM_EMAIL'] || 'AuthVerse <onboarding@resend.dev>';

      const result = await resendClient.emails.send({
        from: fromEmail,
        to: email,
        subject: '🔑 Reset Your Password - AuthVerse',
        html: htmlContent,
      });

      if (!result.data) {
        throw new Error('Failed to send password reset email via Resend');
      }
    } catch (error) {
      throw new Error(
        `Password reset email sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * Send welcome email after successful verification
   */
  static async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to AuthVerse! 🎉</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 40px 30px; }
            .button { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { background-color: #f1f5f9; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to AuthVerse!</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Your account is now active</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Hi ${firstName}! 👋</h2>
              
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Congratulations! Your email has been successfully verified and your AuthVerse account is now active. You're all set to explore our secure authentication platform.
              </p>
              
              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <p style="color: #1e293b; font-weight: 600; margin: 0 0 15px 0;">🚀 What's Next?</p>
                <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                  <li>Complete your profile setup</li>
                  <li>Explore security settings</li>
                  <li>Set up two-factor authentication (recommended)</li>
                  <li>Connect your social accounts</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${FRONTEND_URL}/dashboard" class="button">
                  🏠 Go to Dashboard
                </a>
              </div>
              
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <p style="color: #1e293b; font-weight: 600; margin: 0 0 10px 0;">🛡️ Security Features:</p>
                <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
                  <li>End-to-end encryption for all data</li>
                  <li>Advanced threat detection</li>
                  <li>Secure session management</li>
                  <li>Regular security audits</li>
                </ul>
              </div>
              
              <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin-top: 30px;">
                Need help getting started? Check out our documentation or contact our support team.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0; font-weight: 600;">Welcome to the AuthVerse family! 🎉</p>
              <p style="margin: 0; font-size: 13px;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      const resendClient = initializeResend();
      const fromEmail = process.env['RESEND_FROM_EMAIL'] || 'AuthVerse <onboarding@resend.dev>';

      const result = await resendClient.emails.send({
        from: fromEmail,
        to: email,
        subject: '🎉 Welcome to AuthVerse - Your Account is Active!',
        html: htmlContent,
      });

      if (!result.data) {
        throw new Error('Failed to send welcome email via Resend');
      }
    } catch (error) {
      // Don't throw error for welcome email failures - it's not critical
    }
  }
}
