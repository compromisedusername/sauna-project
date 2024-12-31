declare global {
  namespace Express {
    export interface Request {
      user: {
        role: string;
      };
      token: string;
    }
  }
}

export {};

