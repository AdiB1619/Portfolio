import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, getMe } from '../controllers/auth.controller.js';
import protect from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.js';

const router = Router();

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email')
      .isEmail().withMessage('A valid email address is required')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  login
);

// POST /api/auth/logout  (protected — you must be logged in to log out)
router.post('/logout', protect, logout);

// GET /api/auth/me  (protected)
router.get('/me', protect, getMe);

export default router;
