import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.controller.js';
import protect from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.js';

const router = Router();

// ── Validation chain reused by both POST and PUT ───────────────────────────────
const projectValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters')
    .trim(),
  body('shortDescription')
    .notEmpty().withMessage('Short description is required')
    .isLength({ max: 200 }).withMessage('Short description cannot exceed 200 characters')
    .trim(),
  body('longDescription')
    .notEmpty().withMessage('Long description is required')
    .trim(),
  body('techStack')
    .isArray({ min: 1 }).withMessage('techStack must be an array with at least one item'),
  body('techStack.*')
    .isString().withMessage('Each tech stack item must be a string')
    .trim(),
  body('imageUrl')
    .notEmpty().withMessage('Image URL is required')
    .isURL().withMessage('imageUrl must be a valid URL'),
  body('liveUrl')
    .optional({ nullable: true, checkFalsy: true })
    .isURL().withMessage('liveUrl must be a valid URL'),
  body('githubUrl')
    .optional({ nullable: true, checkFalsy: true })
    .isURL().withMessage('githubUrl must be a valid URL'),
  body('featured')
    .optional()
    .isBoolean().withMessage('featured must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 0 }).withMessage('order must be a non-negative integer'),
];

// ── Public routes ─────────────────────────────────────────────────────────────
router.get('/', getProjects);
router.get('/:id', getProjectById);

// ── Protected routes ─────────────────────────────────────────────────────────
router.post('/', protect, projectValidation, validate, createProject);
router.put('/:id', protect, projectValidation, validate, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
