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
