import { Request, Response, NextFunction} from 'express';
import { HttpError } from '../errors/http-error.error';
import { ErrorResponse } from '../dto/response/responses.response';
export const errorHandler = (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Something wen wrong';
  let details: string | undefined;
  if(err instanceof HttpError ){
        message = err.message;
          statusCode = err.statusCode;
          details = err.details;
  }
  res.status(statusCode).send(new ErrorResponse(statusCode, message, details));
};
