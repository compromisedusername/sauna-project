export interface User {
  role: string;
  name: string;
  id: number;
}
declare global {
  namespace Express {
    export interface Request {
      user?: User = {
      role: string,
      name: string,
      id: number
      },
      token: string;
    }
  }
}

export { };

