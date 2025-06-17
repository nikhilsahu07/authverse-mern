import type { Request } from 'express';
import type { IUserDocument } from '../models/User.js';

export interface AuthRequest extends Request {
  user: IUserDocument;
  userId: string;
}
