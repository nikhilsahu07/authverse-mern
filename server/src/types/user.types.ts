export type AuthProvider = 'local' | 'google' | 'github' | 'facebook';

export interface IOAuthProfile {
  providerId: string;
  provider: AuthProvider;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  profileImage: string | undefined;
}

export interface IUser {
  _id: string;
  email: string;
  password?: string; // Optional for OAuth users
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  profileImage?: string; // Base64 encoded image data
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  emailVerificationOTP?: string;
  emailVerificationOTPExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  isActive: boolean;
  // OAuth fields
  authProvider: AuthProvider;
  oauthProfiles: IOAuthProfile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string; // Base64 encoded image data
  isEmailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  profileImage?: string; // Base64 encoded image data
}

export interface UserQuery {
  email?: string;
  role?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
}
