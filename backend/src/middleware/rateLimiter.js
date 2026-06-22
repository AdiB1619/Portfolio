import rateLimit from 'express-rate-limit';

/**
 * Contact-form rate limiter: 5 submissions per 15 minutes per IP.
 * Applied only to POST /api/contact.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  // Default behavior already uses req.ip
});

export default contactLimiter;
