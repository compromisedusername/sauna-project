export abstract class BasicResponse {
  response: string = "OK";
  statusCode: number = 200;
}

export class NotFoundResponse extends BasicResponse {
  constructor(resourceName: string) {
    super();
    this.response = resourceName + "not found.";
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
