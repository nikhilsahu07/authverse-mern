import mongoose, { type Document, Schema } from 'mongoose';
import type { IUser } from '../types/user.types.js';
import { USER_ROLES } from '../utils/constants.js';

// Extend IUser with Document for Mongoose
export interface IUserDocument extends IUser, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  isEmailVerificationTokenValid: () => boolean;
  isPasswordResetTokenValid: () => boolean;
  clearVerificationTokens: () => void;
  clearPasswordResetTokens: () => void;
}

// Static methods interface
interface IUserModel extends mongoose.Model<IUserDocument> {
  findByEmail: (email: string) => mongoose.Query<IUserDocument | null, IUserDocument>;
  findByEmailVerificationToken: (token: string) => mongoose.Query<IUserDocument | null, IUserDocument>;
  findByPasswordResetToken: (token: string) => mongoose.Query<IUserDocument | null, IUserDocument>;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [50, 'First name must not exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters long'],
      maxlength: [50, 'Last name must not exceed 50 characters'],
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    profileImage: {
      type: String,
      default: undefined,
      validate: {
        validator(v: string): boolean {
          // Validate base64 image format if provided
          if (!v) return true;
          return /^data:image\/(png|jpg|jpeg|gif|webp);base64,/.test(v);
        },
        message: 'Profile image must be a valid base64 encoded image',
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: undefined,
    },
    emailVerificationExpires: {
      type: Date,
      default: undefined,
    },
    passwordResetToken: {
      type: String,
      default: undefined,
    },
    passwordResetExpires: {
      type: Date,
      default: undefined,
    },
    lastLogin: {
      type: Date,
      default: undefined,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: unknown, ret: Record<string, unknown>): void {
        ret['id'] = ret['_id'];
        delete ret['_id'];
        delete ret['__v'];
        delete ret['password'];
        delete ret['emailVerificationToken'];
        delete ret['passwordResetToken'];
      },
    },
    toObject: {
      transform(_doc: unknown, ret: Record<string, unknown>): void {
        ret['id'] = ret['_id'];
        delete ret['_id'];
        delete ret['__v'];
      },
    },
  },
);

// Indexes for better query performance
userSchema.index({ emailVerificationToken: 1 });
userSchema.index({ passwordResetToken: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Middleware to handle password reset token cleanup
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    delete this.passwordResetToken;
    delete this.passwordResetExpires;
  }
  next();
});

// Virtual for full name
userSchema.virtual('fullName').get(function (this: IUserDocument): string {
  return `${this.firstName} ${this.lastName}`;
});

// Instance method to check if email verification token is valid
userSchema.methods['isEmailVerificationTokenValid'] = function (): boolean {
  return this['emailVerificationExpires'] && this['emailVerificationExpires'] > new Date();
};

// Instance method to check if password reset token is valid
userSchema.methods['isPasswordResetTokenValid'] = function (): boolean {
  return this['passwordResetExpires'] && this['passwordResetExpires'] > new Date();
};

// Instance method to clear verification tokens
userSchema.methods['clearVerificationTokens'] = function (): void {
  delete this['emailVerificationToken'];
  delete this['emailVerificationExpires'];
};

// Instance method to clear password reset tokens
userSchema.methods['clearPasswordResetTokens'] = function (): void {
  delete this['passwordResetToken'];
  delete this['passwordResetExpires'];
};

// Static method to find user by email
userSchema.statics['findByEmail'] = function (email: string): mongoose.Query<IUserDocument | null, IUserDocument> {
  return this.findOne({ email: email.toLowerCase().trim() });
};

// Static method to find user by verification token
userSchema.statics['findByEmailVerificationToken'] = function (
  token: string,
): mongoose.Query<IUserDocument | null, IUserDocument> {
  return this.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() },
  });
};

// Static method to find user by password reset token
userSchema.statics['findByPasswordResetToken'] = function (
  token: string,
): mongoose.Query<IUserDocument | null, IUserDocument> {
  return this.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: new Date() },
  });
};

// Create and export the model
const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default User;
