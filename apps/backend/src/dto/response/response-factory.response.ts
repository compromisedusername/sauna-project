

import { Response } from "express";

export abstract class BasicResponse {
  response: string = "OK";
  statusCode: number = 200;
}

export class NotFoundResponse extends BasicResponse {
  constructor(resourceName: string) {
    super();
    this.response = `${resourceName} not found.`;
    this.statusCode = 404;
  }
}

export class OkResponse extends BasicResponse { }

export class ErrorResponse extends BasicResponse {
  details?: string;

  constructor(statusCode: number, response: string, details?: string) {
    super();
    this.response = response;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class CreatedResponse extends BasicResponse {
  constructor(resourceName: string) {
    super();
    this.response = `${resourceName} created successfully.`;
    this.statusCode = 201;
  }
}

export class UpdatedResponse extends BasicResponse {
  constructor(resourceName: string) {
    super();
    this.response = `${resourceName} updated successfully.`;
    this.statusCode = 200;
  }
}

export class DeletedResponse extends BasicResponse {
  constructor(resourceName: string) {
    super();
    this.response = `${resourceName} deleted successfully.`;
    this.statusCode = 200;
  }
}

export class ResponseFactory {
  static ok(res: Response): Response {
    return res.status(200).json(new OkResponse());
  }

  static notFound(res: Response, resourceName: string): Response{
    return res.status(404).json(new NotFoundResponse(resourceName));
  }

  static error(res: Response, statusCode: number, response: string, details?: string): Response {
    return res.status(statusCode).json(new ErrorResponse(statusCode, response, details));
  }

  static created(res: Response, resourceName: string): Response {
    return res.status(201).json(new CreatedResponse(resourceName));
  }

  static updated(res: Response, resourceName: string): Response {
   return  res.status(200).json(new UpdatedResponse(resourceName));
  }

  static deleted(res: Response, resourceName: string): Response {
return     res.status(200).json(new DeletedResponse(resourceName));
  }
}

