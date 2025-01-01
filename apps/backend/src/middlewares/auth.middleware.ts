import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { UserService } from "../services/user.service";
import { ErrorFactory } from "../errors/error-factory.error";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | null = null;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log("Cookie auth");
  }

  if (!token) {
    console.log("Header auth");
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    token = authHeader.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const userService = new UserService();
  const user = await userService.getUserById(decodedToken.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (!req.user) {
    req.user = { role: "", name: "", id: 0 };
  }
  if (!req.token) {
    req.token = "";
  }
  req.user.role = user.role?.name!;
  req.user.name = user.name!;
  req.user.id = user.id!;
  req.token = token;

  next();
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access required" });
  }
};
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && (req.user.role === "user" || req.user.role === "admin")) {
    next();
  } else {
    return res.status(403).json({ message: "Unathorized access." });
  }
};

export const resourceUserAccessMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("userMiddlewareAccess");
  if (req.user && req.user.role === "user") {
    if (req.params && req.params.id && Number(req.params.id) !== req.user.id) {
      return res.status(403).json({ message: "Unathorized access." });
    }
    if (req.body && req.body.userId && req.user.id !== req.body.userId) {
      return res.status(403).json({ message: "Unathorized access." });
    }
    next();
  } else if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Unathorized access." });
  }
};
