import type { Request } from 'express';
import type { IUser } from './user.types.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: string;
    }
  }
}

export interface AuthRequest extends Request {
  user: IUser;
  userId: string;
}
