import {Router} from 'express';
import {UserController} from './../controllers/user.controller';
import { Request, Response, NextFunction } from 'express';
const userRoutes = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRoutes.get('/users',async (req, res, next)   => {
  try {
    await userController.getAllUsers(req, res);
  }catch(error){
    next(error);
  }
});
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user based on their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRoutes.get('/user/:id', async (req, res, next) => {
  try{
      await userController.getUser(req, res);
  }catch(error){
    next(error);
  }
});
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Add a new user
 *     description: Create a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUpdateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created:
 *                   type: integer
 *                   description: The ID of the newly created user.
 */
userRoutes.post('/user', async (req, res, next) => {
    try{
    await userController.addUser(req, res);
  }catch(error){
      next(error)
  }
});
/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Update a user
 *     description: Update an existing user's details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: boolean
 *                   description: Indicates whether the user was successfully updated.
 */
userRoutes.put('/user', async (req: Request, res: Response,next) => {
    try{
      await userController.updateUser(req, res);
    }catch(error){
      next(error)
    }

  });
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Remove a user from the system by their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found.
 */
userRoutes.delete('/user/:id', async (req, res, next) => {
    try{
    await userController.deleteUser(req, res);
  }catch(error){
    next(error)
  }
});

export default userRoutes;
