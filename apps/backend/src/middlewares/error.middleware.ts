import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
):undefined => {
  console.error(err);


 res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
    return;
};

