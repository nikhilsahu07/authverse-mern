export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  profileImage?: string; // Base64 encoded image data
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLogin?: Date;
  isActive: boolean;
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
