import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User, { type IUserDocument } from '../models/User.js';
import { generateTokens } from '../utils/jwt.js';
import type { Tokens } from '../types/common.types.js';
import type { AuthProvider } from '../types/user.types.js';

// Interface for OAuth profile data
interface OAuthProfileData {
  provider: AuthProvider;
  providerId: string;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  profileImage: string | undefined;
}

// Helper function to extract user data from OAuth profiles
const extractUserData = (profile: any, provider: AuthProvider): OAuthProfileData => {
  const email = profile.emails?.[0]?.value;
  let firstName = '';
  let lastName = '';
  let profileImage = '';

  if (provider === 'google') {
    firstName = profile.name?.givenName || '';
    lastName = profile.name?.familyName || '';
    profileImage = profile.photos?.[0]?.value || '';
  } else if (provider === 'github') {
    const fullName = profile.displayName || profile.username || '';
    const nameParts = fullName.split(' ');
    firstName = nameParts[0] || '';
    lastName = nameParts.slice(1).join(' ') || '';
    profileImage = profile.photos?.[0]?.value || '';
  } else if (provider === 'facebook') {
    firstName = profile.name?.givenName || '';
    lastName = profile.name?.familyName || '';
    profileImage = profile.photos?.[0]?.value || '';
  }

  return {
    provider,
    providerId: profile.id,
    email,
    firstName,
    lastName,
    profileImage,
  };
};

// Helper function to handle OAuth authentication
const handleOAuthAuth = async (
  profile: any,
  provider: AuthProvider,
): Promise<{ user: IUserDocument; tokens: Tokens }> => {
  const userData = extractUserData(profile, provider);

  // First, try to find user by OAuth provider
  let user = await User.findByOAuthProvider(provider, userData.providerId);

  if (user) {
    // User exists, update last login
    user.lastLogin = new Date();
    await user.save();
  } else {
    // Check if user exists with the same email
    if (userData.email) {
      user = await User.findByEmail(userData.email);
    }

    if (user) {
      // User exists with email, add OAuth profile
      user.oauthProfiles.push({
        providerId: userData.providerId,
        provider: userData.provider,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImage: userData.profileImage,
      });
      user.lastLogin = new Date();
      // Mark email as verified for OAuth users
      user.isEmailVerified = true;
      // Set profile image from OAuth if user doesn't have a custom one
      if (!user.profileImage && userData.profileImage) {
        user.profileImage = userData.profileImage;
      }
      await user.save();
    } else {
      // Create new user
      user = new User({
        email: userData.email,
        firstName: userData.firstName || 'User',
        lastName: userData.lastName || '',
        profileImage: userData.profileImage, // Set Google profile image as main profile image
        authProvider: userData.provider,
        isEmailVerified: true, // OAuth users are automatically verified
        isActive: true,
        lastLogin: new Date(),
        oauthProfiles: [
          {
            providerId: userData.providerId,
            provider: userData.provider,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            profileImage: userData.profileImage,
          },
        ],
      });
      await user.save();
    }
  }

  // Generate tokens
  const tokens = generateTokens({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return { user, tokens };
};

// Configure Passport strategies
export const configurePassport = (): void => {
  // Google OAuth Strategy
  if (process.env['GOOGLE_CLIENT_ID'] && process.env['GOOGLE_CLIENT_SECRET']) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env['GOOGLE_CLIENT_ID'],
          clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
          callbackURL: process.env['GOOGLE_CALLBACK_URL'] || '/api/auth/google/callback',
        },
        (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
          handleOAuthAuth(profile, 'google')
            .then((result) => {
              done(null, result);
            })
            .catch((error) => {
              done(error, null);
            });
        },
      ),
    );
  } else {
    throw new Error('Google OAuth strategy not registered - missing environment variables');
  }

  // GitHub OAuth Strategy
  if (process.env['GITHUB_CLIENT_ID'] && process.env['GITHUB_CLIENT_SECRET']) {
    passport.use(
      new GithubStrategy(
        {
          clientID: process.env['GITHUB_CLIENT_ID'],
          clientSecret: process.env['GITHUB_CLIENT_SECRET'],
          callbackURL: process.env['GITHUB_CALLBACK_URL'] || '/api/auth/github/callback',
        },
        (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
          handleOAuthAuth(profile, 'github')
            .then((result) => {
              done(null, result);
            })
            .catch((error) => {
              done(error, null);
            });
        },
      ),
    );
  } else {
    throw new Error('GitHub OAuth strategy not registered - missing environment variables');
  }

  // Facebook OAuth Strategy
  if (process.env['FACEBOOK_APP_ID'] && process.env['FACEBOOK_APP_SECRET']) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env['FACEBOOK_APP_ID'],
          clientSecret: process.env['FACEBOOK_APP_SECRET'],
          callbackURL: process.env['FACEBOOK_CALLBACK_URL'] || '/api/auth/facebook/callback',
          profileFields: ['id', 'emails', 'name', 'picture'],
        },
        (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
          handleOAuthAuth(profile, 'facebook')
            .then((result) => {
              done(null, result);
            })
            .catch((error) => {
              done(error, null);
            });
        },
      ),
    );
  } else {
    throw new Error('Facebook OAuth strategy not registered - missing environment variables');
  }

  // Serialize user for session
  passport.serializeUser((user: any, done: any) => {
    done(null, user);
  });

  // Deserialize user from session
  passport.deserializeUser((user: any, done: any) => {
    done(null, user);
  });
};

export default passport;
