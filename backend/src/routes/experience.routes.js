import { Router } from 'express';
import { body } from 'express-validator';
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experience.controller.js';
import protect from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.js';

const router = Router();

const experienceValidation = [
  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['work', 'education']).withMessage('Type must be "work" or "education"'),
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters')
    .trim(),
  body('organization')
    .notEmpty().withMessage('Organization is required')
    .isLength({ max: 150 }).withMessage('Organization cannot exceed 150 characters')
    .trim(),
  body('startDate')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('startDate must be a valid ISO 8601 date (e.g. 2022-06-01)')
    .toDate(),
  body('endDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601().withMessage('endDate must be a valid ISO 8601 date or null')
    .toDate(),
  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters')
    .trim(),
  body('order')
    .optional()
    .isInt({ min: 0 }).withMessage('order must be a non-negative integer'),
];

// ── Public ─────────────────────────────────────────────────────────────────────
router.get('/', getExperience);

// ── Protected ──────────────────────────────────────────────────────────────────
router.post('/', protect, experienceValidation, validate, createExperience);
router.put('/:id', protect, experienceValidation, validate, updateExperience);
router.delete('/:id', protect, deleteExperience);

export default router;
