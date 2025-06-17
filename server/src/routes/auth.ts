import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import {
  validateRegisterRequest,
  validateLoginRequest,
  validatePasswordChangeRequest,
  validateProfileUpdateRequest,
  validateRefreshTokenRequest,
} from '../middleware/validation.js';

const router = Router();

// Public routes
router.post('/register', validateRegisterRequest, AuthController.register);
router.post('/login', validateLoginRequest, AuthController.login);
router.post('/refresh-token', validateRefreshTokenRequest, AuthController.refreshToken);

// OAuth routes
// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  AuthController.oauthSuccess,
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  AuthController.oauthSuccess,
);

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failure' }),
  AuthController.oauthSuccess,
);

// OAuth failure route
router.get('/failure', AuthController.oauthFailure);

// Protected routes (require authentication)
router.use(authenticateToken);

router.post('/logout', AuthController.logout);
router.post('/logout-all', AuthController.logoutAll);
router.post('/change-password', validatePasswordChangeRequest, AuthController.changePassword);
router.get('/profile', AuthController.getProfile);
router.put('/profile', validateProfileUpdateRequest, AuthController.updateProfile);

export default router;
