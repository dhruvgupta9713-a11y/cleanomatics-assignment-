import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // Handle JSON parse syntax errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Malformed JSON body in request';
    errors = [{ message: 'Syntax error parsing JSON payload' }];
  }

  const response = {
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined
  };

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};
