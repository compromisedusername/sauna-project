import { BasicResponse } from "../dto/response/response-factory.response";

BasicResponse
export interface HttpErrorInterface extends BasicResponse{
  statusCode: number;
  details?: string;
  response: string;
}

export class HttpError extends Error implements HttpErrorInterface {
  public statusCode: number;
  public details?: string | undefined;
  public response: string;
  constructor(statusCode: number, message: string, details?: string){
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.response = message;
  }
}
