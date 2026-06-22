import Message from '../models/Message.model.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// ─── POST /api/contact  [PUBLIC + rate-limited] ────────────────────────────────
// The validation chain lives on the route; by the time we're here, all fields are valid.
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  await Message.create({ name, email, subject, message });
  return sendSuccess(
    res,
    { message: 'Thanks for reaching out! I\'ll get back to you soon.' },
    201
  );
});

// ─── GET /api/messages  [PROTECTED] ──────────────────────────────────────────
export const getMessages = asyncHandler(async (req, res) => {
  // Sort newest first
  const messages = await Message.find().sort({ createdAt: -1 });
  return sendSuccess(res, { messages, count: messages.length });
});

// ─── PATCH /api/messages/:id/read  [PROTECTED] ────────────────────────────────
export const markRead = asyncHandler(async (req, res) => {
  // Unconditionally marks message read state
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true, runValidators: true }
  );
  if (!message) return sendError(res, 'Message not found', 404);
  return sendSuccess(res, message);
});

// ─── DELETE /api/messages/:id  [PROTECTED] ────────────────────────────────────
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) return sendError(res, 'Message not found', 404);
  return sendSuccess(res, null);
});
