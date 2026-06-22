import jwt from 'jsonwebtoken';

/**
 * Signs a JWT payload and returns the token string.
 * @param {object} payload - Data to encode (e.g. { id, email })
 * @returns {string} Signed JWT
 */
export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

/**
 * Verifies a JWT string and returns the decoded payload.
 * Throws a JsonWebTokenError if invalid or expired.
 * @param {string} token
 * @returns {object} Decoded payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Shared cookie options — centralised so they never drift between
 * login and logout handlers.
 */
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  path: '/',
};
