import { Router } from 'express';
import { body } from 'express-validator';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skills.controller.js';
import protect from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.js';

const router = Router();

const skillValidation = [
  body('name')
    .notEmpty().withMessage('Skill name is required')
    .isLength({ max: 80 }).withMessage('Name cannot exceed 80 characters')
    .trim(),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['language', 'framework', 'tool', 'other'])
    .withMessage('Category must be one of: language, framework, tool, other'),
  body('proficiency')
    .notEmpty().withMessage('Proficiency is required')
    .isInt({ min: 1, max: 5 }).withMessage('Proficiency must be an integer between 1 and 5'),
  body('icon')
    .optional({ nullable: true, checkFalsy: true })
    .isString().withMessage('icon must be a string')
    .trim(),
];

// ── Public ─────────────────────────────────────────────────────────────────────
router.get('/', getSkills);

// ── Protected ──────────────────────────────────────────────────────────────────
router.post('/', protect, skillValidation, validate, createSkill);
router.put('/:id', protect, skillValidation, validate, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;
