import {HttpError, HttpErrorInterface} from './http-error.error';

export class ErrorFactory {
  public static createBadRequestError(message: string, details?: any): HttpErrorInterface {
    return new HttpError(400, message, details);
  }

  public static createUnauthorizedError(message: string, details?: any):  HttpErrorInterface {
    return new HttpError(401, message, details);
  }

  public static createForbiddenError(message: string, details?: any):  HttpErrorInterface {
    return new HttpError(403, message, details);
  }

  public static createNotFoundError(message: string, details?: any):  HttpErrorInterface{
    return new HttpError(404, message, details);
  }

  public static createConflictError(message: string, details?: any):  HttpErrorInterface{
    return new HttpError(409, message, details);
  }

  public static createInternalServerError(message: string, details?: any):  HttpErrorInterface{
    return new HttpError(500, message, details);
  }
}

