import { Router } from 'express';
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

// Protected routes (require authentication)
router.use(authenticateToken);

router.post('/logout', AuthController.logout);
router.post('/logout-all', AuthController.logoutAll);
router.post('/change-password', validatePasswordChangeRequest, AuthController.changePassword);
router.get('/profile', AuthController.getProfile);
router.put('/profile', validateProfileUpdateRequest, AuthController.updateProfile);

export default router;
