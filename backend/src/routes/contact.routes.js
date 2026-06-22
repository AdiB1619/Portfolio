import { Router } from 'express';
import { body } from 'express-validator';
import { createMessage } from '../controllers/messages.controller.js';
import contactLimiter from '../middleware/rateLimiter.js';
import validate from '../middleware/validate.js';

const router = Router();

/**
 * POST /api/contact  [PUBLIC, rate-limited: 5 req / 15 min / IP]
 *
 * Public-facing contact form endpoint.
 * Admin inbox reads are at GET /api/messages (separate protected router).
 */
router.post(
  '/',
  contactLimiter,
  [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
      .trim(),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('A valid email address is required')
      .normalizeEmail(),
    body('subject')
      .notEmpty().withMessage('Subject is required')
      .isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters')
      .trim(),
    body('message')
      .notEmpty().withMessage('Message is required')
      .isLength({ min: 10, max: 2000 })
      .withMessage('Message must be between 10 and 2000 characters')
      .trim(),
  ],
  validate,
  createMessage
);

export default router;
