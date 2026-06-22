import Experience from '../models/Experience.model.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// ─── GET /api/experience  [PUBLIC] ────────────────────────────────────────────
export const getExperience = asyncHandler(async (req, res) => {
  // Sort: most recent first; within same startDate use order field
  const experience = await Experience.find().sort({ startDate: -1, order: 1 });
  return sendSuccess(res, { experience, count: experience.length });
});

// ─── POST /api/experience  [PROTECTED] ────────────────────────────────────────
export const createExperience = asyncHandler(async (req, res) => {
  const entry = await Experience.create(req.body);
  return sendSuccess(res, entry, 201);
});

// ─── PUT /api/experience/:id  [PROTECTED] ─────────────────────────────────────
export const updateExperience = asyncHandler(async (req, res) => {
  const entry = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!entry) return sendError(res, 'Experience entry not found', 404);
  return sendSuccess(res, entry);
});

// ─── DELETE /api/experience/:id  [PROTECTED] ──────────────────────────────────
export const deleteExperience = asyncHandler(async (req, res) => {
  const entry = await Experience.findByIdAndDelete(req.params.id);
  if (!entry) return sendError(res, 'Experience entry not found', 404);
  return sendSuccess(res, null);
});
