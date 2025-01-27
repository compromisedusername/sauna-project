import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { adminMiddleware, authMiddleware } from "../middlewares/auth.middleware";
const roleRoutes: Router = Router();

const roleController: RoleController = new RoleController();
/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     tags:
 *        - role
 *     summary: Get a role by ID
 *     description: Retrieve a role based on its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The role's ID
 *     responses:
 *       200:
 *         description: Role details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       404:
 *         description: Role not found.
 */
roleRoutes.get(
 "/role/:id",authMiddleware as RequestHandler, adminMiddleware as RequestHandler,
 async (req: Request, res: Response, next: NextFunction) => {
  try {
   await roleController.getRole(req, res);
  } catch (error) {
   next(error);
  }
 },
);
 /**
 * @swagger
 * /api/roles:
 *   get:
 *     tags:
 *       - role
 *     summary: Get all roles
 *     description: Returns a list of all roles. You can optionally include user information.
 *     parameters:
 *       - in: query
 *         name: users
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: |
 *           Optional. If set to `true`, returns roles with user information.
 *           If set to `false` or not provided, returns only role information.
 *     responses:
 *       200:
 *         description: List of roles successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Error fetching roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *   post:
 *     tags:
 *        - role
 *     summary: Add a new role
 *     description: Create a new role in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddRoleRequest'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created:
 *                   type: integer
 *                   description: The ID of the newly created role.
 */
roleRoutes.get(
 "/roles",authMiddleware as RequestHandler, adminMiddleware as RequestHandler,
 async (req: Request, res: Response, next: NextFunction) => {
  try {
   await roleController.getAllRoles(req, res);
  } catch (error) {
   next(error);
  }
 },
); /**
 * @swagger
 * /api/role:
 *   post:
 *     tags:
 *        - role
 *     summary: Add a new role
 *     description: Create a new role in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddRoleRequest'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created:
 *                   type: integer
 *                   description: The ID of the newly created role.
 */
roleRoutes.post(
 "/role",authMiddleware as RequestHandler, adminMiddleware as RequestHandler,
 async (req: Request, res: Response, next: NextFunction) => {
  try {
   await roleController.addRole(req, res);
  } catch (error) {
   next(error);
  }
 },
);
/**
 * @swagger
 * /api/role:
 *   put:
 *     tags:
 *        - role
 *     summary: Update a role
 *     description: Update an existing role's details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoleRequest'
 *     responses:
 *       200:
 *         description: Role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: boolean
 *                   description: Indicates whether the role was successfully updated.
 *       404:
 *         description: Role not found.
 */
roleRoutes.put(
 "/role",authMiddleware as RequestHandler, adminMiddleware as RequestHandler,
 async (req: Request, res: Response, next: NextFunction) => {
  try {
   await roleController.updateRole(req, res);
  } catch (error) {
   next(error);
  }
 },
); /**
 * @swagger
 * /api/role/{id}:
 *   delete:
 *     tags:
 *        - role
 *     summary: Delete a role
 *     description: Remove a role from the system by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The role's ID
 *     responses:
 *       200:
 *         description: Role deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Role not found.
 */
roleRoutes.delete(
 "/role/:id",
authMiddleware as RequestHandler, adminMiddleware as RequestHandler,
 async (req: Request, res: Response, next: NextFunction) => {
  try {
   await roleController.deleteRole(req, res);
  } catch (error) {
   next(error);
  }
 },
);
export default roleRoutes;
