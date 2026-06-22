import Skill from '../models/Skill.model.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// ─── GET /api/skills  [PUBLIC] ────────────────────────────────────────────────
export const getSkills = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }

  const skills = await Skill.find(filter).sort({ category: 1, proficiency: -1 });
  return sendSuccess(res, { skills, count: skills.length });
});

// ─── POST /api/skills  [PROTECTED] ───────────────────────────────────────────
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  return sendSuccess(res, skill, 201);
});

// ─── PUT /api/skills/:id  [PROTECTED] ────────────────────────────────────────
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!skill) return sendError(res, 'Skill not found', 404);
  return sendSuccess(res, skill);
});

// ─── DELETE /api/skills/:id  [PROTECTED] ─────────────────────────────────────
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) return sendError(res, 'Skill not found', 404);
  return sendSuccess(res, null);
});
