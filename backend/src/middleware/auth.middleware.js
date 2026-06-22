import { verifyToken, cookieOptions } from '../utils/jwt.js';
import { sendError } from '../utils/apiResponse.js';

/**
 * Middleware: reads the `token` httpOnly cookie, verifies the JWT,
 * and attaches the decoded payload to req.user.
 * Rejects with 401 if the cookie is missing or the token is invalid.
 */
const protect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return sendError(res, 'Not authenticated. Please log in.', 401);
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    // Clear a bad cookie so the browser doesn't keep re-sending it
    res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
    return sendError(res, 'Session expired or invalid. Please log in again.', 401);
  }
};

export default protect;
