// backend/src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('[Server Error]', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
}
