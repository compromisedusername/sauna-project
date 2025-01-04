
import { RequestHandler, Router } from "express";
import { UserController } from "./../controllers/user.controller";
import { Request, Response, NextFunction } from "express";
import {
  authMiddleware,
} from "../middlewares/auth.middleware";
import { AuthController } from "../controllers/auth.controller";
const authRoutes = Router();
const authController = new AuthController();



/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login to system
 *     description: Allows a user to log in to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwtToken:
 *                   type: string
 *                   description: JWT token for authentication.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid login credentials.
 */

authRoutes.post("/login", async (req, res, next) => {
  try {
    await authController.loginUser(req, res);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /api/logout:
 *   get:
 *     tags:
 *       - auth
 *     summary: Logout user
 *     description: Clear auth params..
 *     responses:
 *       200:
 *         description: User logout successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "logged out"
 *       400:
 *         description: Invalid registration data.
 */
authRoutes.get("/logout", async (req, res, next) => {
  try {
    req.token = "";
    req.user = undefined;
    req.cookies = null;
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
    })
      res.status(200).json({ response: "logged out"  });
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - auth
 *     summary: Register a new user
 *     description: Allows a new user to register in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwtToken:
 *                   type: string
 *                   description: JWT token for authentication.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid registration data.
 */
authRoutes.post("/register", async (req, res, next) => {
  try {
    await authController.registerUser(req, res);
  } catch (error) {
    next(error);
  }
});
authRoutes.get(
  "/me",
  authMiddleware as RequestHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ response: req.user, token: req.token });
    } catch (error) {
      next(error);
    }
  },
);

export default authRoutes;
