import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserService } from '../services/user.service';
import { ErrorFactory } from '../errors/error-factory.error';
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
  return  res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const userService = new UserService()
  const user = await userService.getUserById(decodedToken.userId)
  if (!user) {
      return res.status(404).json({message: "User not found."});
  }

  if(!req.user){
    req.user = { role: ""}
  }
  if(!req.token){
    req.token = ""
  }
  req.user.role = user.role?.name!;
  req.token = token;

  next()
};

export const adminMiddleware = (req:Request, res:Response, next: NextFunction) => {
    if(req.user && req.user.role === 'admin'){
        next()
    } else {
        return res.status(403).json({ message: 'Admin access required' });
    }
}
