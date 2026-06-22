/**
 * Global Express error handler — must be the LAST app.use() in app.js.
 *
 * Catches anything passed via next(err).
 * Never leaks stack traces in production.
 */
const errorHandler = (err, req, res, _next) => {
  // ── Log every error server-side (morgan logs requests, this logs errors) ──
  console.error(`❌ [${req.method}] ${req.originalUrl}`, {
    message: err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });

  // ── Mongoose validation error ─────────────────────────────────────────────
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  // ── Mongoose duplicate-key (e.g. duplicate email) ─────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `A record with that ${field} already exists`,
      errors: [],
    });
  }

  // ── Mongoose bad ObjectId ─────────────────────────────────────────────────
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field "${err.path}"`,
      errors: [],
    });
  }

  // ── JWT errors ────────────────────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token', errors: [] });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token expired', errors: [] });
  }

  // ── Generic / programmer errors ───────────────────────────────────────────
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : err.message || 'Internal server error';

  return res.status(statusCode).json({ success: false, message, errors: [] });
};

export default errorHandler;
