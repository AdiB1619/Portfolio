/**
 * Global Async Error Wrapper Utility
 * Eliminates the need for try/catch blocks in async controllers.
 * Any unhandled promise rejections are automatically passed to the next()
 * error handler.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
