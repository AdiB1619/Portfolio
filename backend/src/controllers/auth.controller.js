import User from '../models/User.model.js';
import { signToken, cookieOptions } from '../utils/jwt.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// ─── POST /api/auth/login ──────────────────────────────────────────────────────
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Fetch user + select the hidden passwordHash field
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');

  if (!user || !(await user.comparePassword(password))) {
    // Identical message for both "user not found" and "wrong password" — no enumeration
    return sendError(res, 'Invalid email or password', 401);
  }

  // Sign JWT with id + role (never put the hash or sensitive data in the payload)
  const token = signToken({ id: user._id, role: user.role });
  res.cookie('token', token, cookieOptions);

  // Return only safe fields — never the token in the body, never the hash
  return sendSuccess(res, { email: user.email, role: user.role });
});

// ─── POST /api/auth/logout ─────────────────────────────────────────────────────
export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
  return sendSuccess(res, null);
});

// ─── GET /api/auth/me  (protected — attach authMiddleware on the route) ─────────
export const getMe = asyncHandler(async (req, res) => {
  // req.user was attached by authMiddleware (contains id + role from JWT)
  const user = await User.findById(req.user.id).select('email role createdAt');
  if (!user) return sendError(res, 'User not found', 401); // 401 if token is valid but user deleted
  return sendSuccess(res, { email: user.email, role: user.role });
});
