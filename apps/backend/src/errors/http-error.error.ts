export interface HttpErrorInterface{
  statusCode: number;
  details?: string;
}

export class HttpError extends Error implements HttpErrorInterface {
  public statusCode: number;
  public details?: string | undefined;

  constructor(statusCode: number, message: string, details?: string){
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
