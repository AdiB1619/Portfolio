import { Router } from 'express';
import { body } from 'express-validator';
import { getMessages, markRead, deleteMessage } from '../controllers/messages.controller.js';
import protect from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.js';

const router = Router();

// All admin inbox routes are protected
router.use(protect);

// ── GET /api/messages ──────────────────────────────────────────────────────────
router.get('/', getMessages);

// ── PATCH /api/messages/:id/read ───────────────────────────────────────────────
router.patch('/:id/read', markRead);

// ── DELETE /api/messages/:id ───────────────────────────────────────────────────
router.delete('/:id', deleteMessage);

export default router;
