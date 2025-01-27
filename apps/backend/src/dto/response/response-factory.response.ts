

import { Response } from "express";
import { EntitySchema } from "typeorm";
import { User } from "../../entities/user.model";

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
  id: number;
  constructor(id: number) {
    super(`created successfully`);
    this.statusCode = 201;
    this.id = id;
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

export class LoggedResponse extends BasicResponse {
  jwtToken: string;
  constructor(jwtToken: string) {
    super(`logged successfully.`);
    this.statusCode = 200;
    this.jwtToken = jwtToken;
  }
}


export class RegisteredResponse extends BasicResponse {
  jwtToken: string;
  constructor(jwtToken: string) {
    super(`registered successfully.`);
    this.statusCode = 200;
    this.jwtToken = jwtToken;
  }
}
export class ResponseFactory {
  static ok<T>(res: Response, data: T): Response {
    return res.status(200).json(data);
  }

  static registered(res: Response, jwtToken: string): Response{
    return res.status(201).json( new RegisteredResponse(jwtToken) )
  }
  static logged(res: Response, jwtToken: string): Response{
    return res.status(200).json( new LoggedResponse(jwtToken));
  }
  static notFound(res: Response, resourceName: string): Response{
    return res.status(404).json(new NotFoundResponse(resourceName));
  }

  static error(res: Response, statusCode: number, response: string, details?: string): Response {
    return res.status(statusCode).json(new ErrorResponse(statusCode, response, details));
  }

  static created(res: Response, id: number): Response {
    return res.status(201).json(new CreatedResponse(id));
  }

  static updated(res: Response, resourceName: string): Response {
   return  res.status(200).json(new UpdatedResponse(resourceName));
  }

  static deleted(res: Response, resourceName: string): Response {
return     res.status(200).json(new DeletedResponse(resourceName));
  }
}

