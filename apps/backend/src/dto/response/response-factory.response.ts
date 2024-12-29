

import { Response } from "express";
import { EntitySchema } from "typeorm";

export abstract class BasicResponse {
  response: string = "OK";
  statusCode: number = 200;
  constructor(data: string){
  this.response = data}
}

export class NotFoundResponse extends BasicResponse {
  constructor(resourceName: string) {
    super(`${resourceName} not found.`);
    this.statusCode = 404;
  }
}

export class OkResponse extends BasicResponse {constructor(data: string){super(data)}}

export class ErrorResponse extends BasicResponse {
  details?: string;

  constructor(statusCode: number, response: string, details?: string) {
    super(response);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class CreatedResponse extends BasicResponse {
  constructor(resourceName: string) {
    super(`${resourceName} created successfully.`);
    this.statusCode = 201;
  }
}

export class UpdatedResponse extends BasicResponse {
  constructor(resourceName: string) {
    super(`${resourceName} updated successfully.`);
    this.statusCode = 200;
  }
}

export class DeletedResponse extends BasicResponse {
  constructor(resourceName: string) {
    super(`${resourceName} deleted successfully.`);
    this.statusCode = 200;
  }
}

export class ResponseFactory {
  static ok<T>(res: Response, data: T): Response {
    return res.status(200).json(data);
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

