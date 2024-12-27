
import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`);

  const originalNext = next;
  const nextWithLogging: NextFunction = (error?: any) => {
    if (error) {
      console.error(`[${new Date().toISOString()}] Error passed to next():`, error);
    } else {
      console.log(`[${new Date().toISOString()}] Passing to next middleware or handler`);
    }
    originalNext(error);
  };

  nextWithLogging();
};
