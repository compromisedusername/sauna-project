import {Router} from 'express';
import {UserController} from './../controllers/user.controller';
import { Request, Response, NextFunction } from 'express';
const userRoutes = Router();
const userController = new UserController();


/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *        - user
 *     summary: Login to system
 *     description: Login to system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properites:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwtToken:
 *                   type:string
 *                 $ref: #/components/schemas/User
 */
userRoutes.post('/login', async(req, res, next) => {

  try{
    await userController.loginUser(req , res);

  }catch(error){
    next(error);
  }
})
/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *        - user
 *     summary: Register to system
 *     description: Register to system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: #/components/schemas/User
 *
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwtToken:
 *                   type:string
 *                 $ref: #/components/schemas/User
 */
userRoutes.post('/register', async(req, res, next) => {

  try{
    await userController.registerUser(req, res);
  }catch(error){
    next(error);
  }
})

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *        - user
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
 *     tags:
 *        - user
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
 *     tags:
 *        - user
 *     summary: Add a new user
 *     description: Create a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUserRequest'
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
 *     tags:
 *        - user
 *     summary: Update a user
 *     description: Update an existing user's details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
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
 *     tags:
 *        - user
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
