import {Router} from 'express';
import {ReservationController } from './../controllers/reservation.controller';

import {Request, Response, NextFunction} from 'express';

const reservationRoutes: Router = Router();

const reservationController: ReservationController = new ReservationController();

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     tags:
 *        - reservation
 *     summary: Get all reservations
 *     description: Retrieve a list of all reservations in the system.
 *     responses:
 *       200:
 *         description: A list of reservations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
reservationRoutes.get('/reservations', async (req: Request, res: Response, next: NextFunction) => {
     try{
      await reservationController.getAllReservations(req, res);
  }catch(error){
    next(error)
  }
});
/**
 * @swagger
 * /api/reservation/{id}:
 *   get:
 *     tags:
 *        - reservation
 *     summary: Get a reservation by ID
 *     description: Retrieve a reservation based on its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The reservation's ID
 *     responses:
 *       200:
 *         description: Reservation details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found.
 */
reservationRoutes.get('/reservation/:id', async (req: Request, res: Response, next: NextFunction) => {
     try{
      await reservationController.getReservation(req, res);
  }catch(error){
    next(error)
  }
});/**
 * @swagger
 * /api/reservation:
 *   post:
 *     tags:
 *        - reservation
 *     summary: Add a new reservation
 *     description: Create a new reservation in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddReservationRequest'
 *     responses:
 *       201:
 *         description: Reservation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created:
 *                   type: integer
 *                   description: The ID of the newly created reservation.
 */
reservationRoutes.post('/reservation', async (req: Request, res: Response, next: NextFunction) => {
     try{
      await reservationController.addReservation(req, res);
  }catch(error){
    next(error)
  }
});/**
 * @swagger
 * /api/reservation:
 *   put:
 *     tags:
 *        - reservation
 *     summary: Update a reservation
 *     description: Update an existing reservation's details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReservationRequest'
 *     responses:
 *       200:
 *         description: Reservation updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: boolean
 *                   description: Indicates whether the reservation was successfully updated.
 *       404:
 *         description: Reservation not found.
 */
reservationRoutes.put('/reservation/', async (req: Request, res: Response, next: NextFunction) => {
     try{
      await reservationController.updateReservation(req, res);
  }catch(error){
    next(error)
  }
});/**
 * @swagger
 * /api/reservation/{id}:
 *   delete:
 *     tags:
 *        - reservation
 *     summary: Delete a reservation
 *     description: Remove a reservation from the system by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The reservation's ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Reservation not found.
 */
reservationRoutes.delete('/reservation/:id', async (req: Request, res: Response, next: NextFunction) => {
     try{
      await reservationController.updateReservation(req, res);
  }catch(error){
    next(error)
  }
});

export default reservationRoutes;
