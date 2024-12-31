
export interface AuthRequest extends Request  {
  user: {
    id: number;
    role: string;
    email: string;
  };
  token: string;
}
