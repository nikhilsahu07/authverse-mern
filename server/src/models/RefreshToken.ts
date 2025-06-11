import mongoose, { type Document, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  token: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isValid: () => boolean;
  revoke: () => void;
}

// Static methods interface
interface IRefreshTokenModel extends mongoose.Model<IRefreshToken> {
  findValidToken: (token: string) => mongoose.Query<IRefreshToken | null, IRefreshToken>;
  revokeAllUserTokens: (userId: mongoose.Types.ObjectId) => Promise<mongoose.UpdateWriteOpResult>;
  cleanupExpiredTokens: () => mongoose.Query<mongoose.mongo.DeleteResult, IRefreshToken>;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: unknown, ret: Record<string, any>): void {
        ret['id'] = ret['_id'];
        delete ret['_id'];
        delete ret['__v'];
      },
    },
  },
);

// Indexes for better query performance (remove duplicate token and expiresAt indexes)
refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ isActive: 1 });

// TTL index to automatically delete expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Instance method to check if token is valid
refreshTokenSchema.methods['isValid'] = function (this: IRefreshToken): boolean {
  return this.isActive && this.expiresAt > new Date();
};

// Instance method to revoke token
refreshTokenSchema.methods['revoke'] = function (this: IRefreshToken): void {
  this.isActive = false;
};

// Static method to find valid token
refreshTokenSchema.statics['findValidToken'] = function (
  token: string,
): mongoose.Query<IRefreshToken | null, IRefreshToken> {
  return this.findOne({
    token,
    isActive: true,
    expiresAt: { $gt: new Date() },
  }).populate('userId');
};

// Static method to revoke all tokens for a user
// eslint-disable-next-line @typescript-eslint/require-await
refreshTokenSchema.statics['revokeAllUserTokens'] = async function (
  userId: mongoose.Types.ObjectId,
): Promise<mongoose.UpdateWriteOpResult> {
  return this.updateMany({ userId, isActive: true }, { isActive: false }).exec();
};

// Static method to cleanup expired tokens
refreshTokenSchema.statics['cleanupExpiredTokens'] = function (): mongoose.Query<
  mongoose.mongo.DeleteResult,
  IRefreshToken
> {
  return this.deleteMany({
    $or: [{ expiresAt: { $lt: new Date() } }, { isActive: false }],
  });
};

const RefreshToken = mongoose.model<IRefreshToken, IRefreshTokenModel>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
