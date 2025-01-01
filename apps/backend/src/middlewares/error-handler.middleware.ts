import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http-error.error";
import { ResponseFactory } from "../dto/response/response-factory.response";
export const errorHandler = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let details: string | undefined;
  if (err instanceof HttpError) {
    message = err.message;
    statusCode = err.statusCode;
    details = err.details;
  } else if(process.env.NODE_ENV === 'development') {
    details = err.message;
  }
  ResponseFactory.error(res, statusCode, message, details);
};
