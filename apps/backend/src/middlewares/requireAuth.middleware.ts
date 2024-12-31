import { RequestHandler, Request, Response } from "express";

export function requireAuthorization(): RequestHandler {

  return (req: Request, res: Response, next: Function) => {

    if (req.headers['authorization']) {
      res.status(403).send('Authorization header is required');
      return;
    }

    next();
  };
}
