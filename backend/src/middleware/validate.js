import { validationResult } from 'express-validator';

/**
 * Run after express-validator chains.
 * If there are validation errors, immediately return 400 with the full
 * error array — controllers never execute in that case.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

export default validate;
