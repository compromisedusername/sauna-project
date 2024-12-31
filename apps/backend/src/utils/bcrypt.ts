import bcrypt from "bcrypt";

export const hashPassword = async (password: string, saltRounds = 10): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
}

export const comparePasswords = async (password: string, passwordHash: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
}
export const generateSalt = async (): Promise<string> => bcrypt.genSalt();

