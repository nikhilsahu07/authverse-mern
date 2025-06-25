import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  type Profile as GoogleProfile,
  type VerifyCallback,
} from 'passport-google-oauth20';
import { Strategy as GithubStrategy, type Profile as GitHubProfile } from 'passport-github2';
import { Strategy as FacebookStrategy, type Profile as FacebookProfile } from 'passport-facebook';
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

// Union type for all OAuth profiles
type OAuthProfile = GoogleProfile | GitHubProfile | FacebookProfile;

// Helper function to extract user data from OAuth profiles
const extractUserData = (profile: OAuthProfile, provider: AuthProvider): OAuthProfileData => {
  const email = profile.emails?.[0]?.value;
  let firstName = '';
  let lastName = '';
  let profileImage = '';

  if (provider === 'google') {
    firstName = profile.name?.givenName || '';
    lastName = profile.name?.familyName || '';
    profileImage = profile.photos?.[0]?.value || '';
  } else if (provider === 'github') {
    const fullName = profile.displayName || (profile as GitHubProfile).username || '';
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
  profile: OAuthProfile,
  provider: AuthProvider,
): Promise<{ user: IUserDocument; tokens: Tokens }> => {
  const userData = extractUserData(profile, provider);

  // Try to find user by OAuth provider
  let user = await User.findByOAuthProvider(provider, userData.providerId);

  if (user) {
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
      user.isEmailVerified = true;
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
        profileImage: userData.profileImage,
        authProvider: userData.provider,
        isEmailVerified: true,
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
  // Serialize user for session storage
  passport.serializeUser((user: any, done) => {
    try {
      // If user is the OAuth result object, extract the user
      if (user?.user && user.tokens) {
        done(null, user.user._id.toString());
      } else if (user?._id) {
        // If it's a user document directly
        done(null, user._id.toString());
      } else {
        done(new Error('Invalid user object for serialization'), null);
      }
    } catch (error) {
      done(error, null);
    }
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        done(new Error('User not found'), null);
        return;
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google OAuth Strategy
  if (process.env['GOOGLE_CLIENT_ID'] && process.env['GOOGLE_CLIENT_SECRET']) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env['GOOGLE_CLIENT_ID'],
          clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
          callbackURL: process.env['GOOGLE_CALLBACK_URL'] || '/api/auth/google/callback',
        },
        (_accessToken: string, _refreshToken: string, profile: GoogleProfile, done: VerifyCallback) => {
          handleOAuthAuth(profile, 'google')
            .then((result) => {
              done(null, result);
            })
            .catch((error) => {
              done(error);
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
        (_accessToken: string, _refreshToken: string, profile: GitHubProfile, done: VerifyCallback) => {
          handleOAuthAuth(profile, 'github')
            .then((result) => {
              done(null, result);
            })
            .catch((error) => {
              done(error);
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
        (_accessToken: string, _refreshToken: string, profile: FacebookProfile, done: VerifyCallback) => {
          handleOAuthAuth(profile, 'facebook')
            .then((result) => {
              done(null, result);
            })
            .catch((error) => {
              done(error);
            });
        },
      ),
    );
  } else {
    throw new Error('Facebook OAuth strategy not registered - missing environment variables');
  }
};

export default passport;
