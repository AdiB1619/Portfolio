import Project from '../models/Project.model.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// ─── GET /api/projects  [PUBLIC] ──────────────────────────────────────────────
export const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured !== undefined) {
    filter.featured = req.query.featured === 'true';
  }

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  return sendSuccess(res, { projects, count: projects.length });
});

// ─── GET /api/projects/:id  [PUBLIC] ──────────────────────────────────────────
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return sendError(res, 'Project not found', 404);
  return sendSuccess(res, project);
});

// ─── POST /api/projects  [PROTECTED] ──────────────────────────────────────────
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  return sendSuccess(res, project, 201);
});

// ─── PUT /api/projects/:id  [PROTECTED] ───────────────────────────────────────
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!project) return sendError(res, 'Project not found', 404);
  return sendSuccess(res, project);
});

// ─── DELETE /api/projects/:id  [PROTECTED] ────────────────────────────────────
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return sendError(res, 'Project not found', 404);
  return sendSuccess(res, null);
});
