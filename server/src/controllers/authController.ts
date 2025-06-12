import type { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { createSuccessResponse } from '../utils/helpers.js';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../utils/constants.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import type { IUserDocument } from '../models/User.js';

// Extend Express Request type to include user
interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
  userId?: string;
}

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password, firstName, lastName } = req.body;

    const result = await AuthService.register({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(HTTP_STATUS.CREATED).json(
      createSuccessResponse(SUCCESS_MESSAGES.USER_REGISTERED, {
        user: result.user.toJSON(),
        tokens: {
          accessToken: result.tokens.accessToken.token,
          refreshToken: result.tokens.refreshToken.token,
        },
      }),
    );
  });

  static login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const result = await AuthService.login({ email, password });

    res.status(HTTP_STATUS.OK).json(createSuccessResponse(SUCCESS_MESSAGES.LOGIN_SUCCESS, result));
  });

  static refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    const newTokens = await AuthService.refreshToken(refreshToken);

    res.status(HTTP_STATUS.OK).json(
      createSuccessResponse(SUCCESS_MESSAGES.TOKEN_REFRESHED, {
        accessToken: newTokens.accessToken.token,
        refreshToken: newTokens.refreshToken.token,
      }),
    );
  });

  static logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    await AuthService.logout(refreshToken);

    res.status(HTTP_STATUS.OK).json(createSuccessResponse(SUCCESS_MESSAGES.LOGOUT_SUCCESS));
  });

  static logoutAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req;
    if (!userId) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json(createSuccessResponse(SUCCESS_MESSAGES.LOGOUT_SUCCESS));
      return;
    }

    await AuthService.logoutAll(userId);

    res.status(HTTP_STATUS.OK).json(createSuccessResponse('Logged out from all devices successfully'));
  });

  static changePassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req;
    if (!userId) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json(createSuccessResponse(SUCCESS_MESSAGES.LOGOUT_SUCCESS));
      return;
    }

    await AuthService.changePassword(userId, currentPassword, newPassword);

    res.status(HTTP_STATUS.OK).json(createSuccessResponse(SUCCESS_MESSAGES.PASSWORD_CHANGED));
  });

  static getProfile = asyncHandler((req: Request, res: Response): void => {
    const authReq = req as AuthenticatedRequest;
    const { user } = authReq;
    if (!user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json(createSuccessResponse(SUCCESS_MESSAGES.LOGOUT_SUCCESS));
      return;
    }

    res.status(HTTP_STATUS.OK).json(createSuccessResponse('Profile retrieved successfully', user.toJSON()));
  });

  static updateProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName } = req.body;
    const authReq = req as AuthenticatedRequest;
    const { user } = authReq;
    if (!user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json(createSuccessResponse(SUCCESS_MESSAGES.LOGOUT_SUCCESS));
      return;
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();

    res.status(HTTP_STATUS.OK).json(createSuccessResponse(SUCCESS_MESSAGES.PROFILE_UPDATED, user.toJSON()));
  });
}
