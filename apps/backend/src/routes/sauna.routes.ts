
import { Router } from "express";
import { SaunaController } from "../controllers/sauna.controller";
import { Request, Response, RequestHandler,  NextFunction } from "express";
import {userMiddleware, adminMiddleware, authMiddleware } from "../middlewares/auth.middleware";

const saunaRoutes = Router();
const saunaController = new SaunaController();

/**
 * @swagger
 * /api/saunas:
 *   get:
 *     tags:
 *        - sauna
 *     summary: Get all saunas
 *     description: Retrieve a list of all saunas in the system.
 *     responses:
 *       200:
 *         description: A list of saunas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SaunaResponse'
 */
saunaRoutes.get('/saunas', authMiddleware as RequestHandler, adminMiddleware as RequestHandler,async (req, res, next) => {
  try {
    await saunaController.getAllSaunas(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/sauna/{id}:
 *   get:
 *     tags:
 *        - sauna
 *     summary: Get a sauna by ID
 *     description: Retrieve a sauna based on its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The sauna's ID
 *     responses:
 *       200:
 *         description: Sauna details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaunaResponse'
 *       404:
 *         description: Sauna not found.
 */
saunaRoutes.get('/sauna/:id', authMiddleware as RequestHandler, userMiddleware as RequestHandler,async (req, res, next) => {
  try {
    await saunaController.getSauna(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/sauna:
 *   post:
 *     tags:
 *        - sauna
 *     summary: Add a new sauna
 *     description: Create a new sauna in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddSaunaRequest'
 *     responses:
 *       201:
 *         description: Sauna created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created:
 *                   type: integer
 *                   description: The ID of the newly created sauna.
 */
saunaRoutes.post('/sauna', authMiddleware as RequestHandler, adminMiddleware as RequestHandler,async (req, res, next) => {
  try {
    await saunaController.addSauna(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/sauna:
 *   put:
 *     tags:
 *        - sauna
 *     summary: Update a sauna
 *     description: Update an existing sauna's details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSaunaRequest'
 *     responses:
 *       200:
 *         description: Sauna updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: boolean
 *                   description: Indicates whether the sauna was successfully updated.
 *       404:
 *         description: Sauna not found.
 */
saunaRoutes.put('/sauna', authMiddleware as RequestHandler, adminMiddleware as RequestHandler,async (req: Request, res: Response, next) => {
  try {
    await saunaController.updateSauna(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/sauna/{id}:
 *   delete:
 *     tags:
 *        - sauna
 *     summary: Delete a sauna
 *     description: Remove a sauna from the system by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The sauna's ID
 *     responses:
 *       200:
 *         description: Sauna deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Sauna not found.
 */
saunaRoutes.delete('/sauna/:id', authMiddleware as RequestHandler, adminMiddleware as RequestHandler,async (req, res, next) => {
  try {
    await saunaController.deleteSauna(req, res);
  } catch (error) {
    next(error);
  }
});

export default saunaRoutes;
