
import { Request, Response } from "express";
import { ResponseFactory } from "../dto/response/response-factory.response";
import { ErrorFactory } from "../errors/error-factory.error";
import { SaunaService } from "../services/sauna.service";
import { SaunaResponse } from "../dto/response/sauna.response.dto";
import { AddSaunaRequest } from "../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../dto/request/update.sauna.request";
import { Role } from "../entities/role.model";
import {  ReservationService } from "../services/reservation.service";
import { ReservationDto } from "../dto/response/reservation.response.dto";
import { Reservation } from "../entities/reservation.model";
import { AddReservationRequest } from "../dto/request/add.reservation.request";
import { UpdateReservationRequest } from "../dto/request/update.reservation.request";

export class ReservationController {
  private readonly reservationService: ReservationService;

  constructor() {
    this.reservationService = new ReservationService();
  }


public async getAllReservationsPaginated(req: Request, res: Response){
    try{

    const page: number = Number(req.params.page);
    const pageSize: number = Number(req.params.pageSize);

    const [reservations, count]: [ReservationDto[], number] =
      await this.reservationService.getAllReservationsPaginated(
        page,
        pageSize,
      );

    return ResponseFactory.ok(res, {
        reservations: reservations,
        totalitems: count,
        currentPage: page,
        pageSize: pageSize,
        totalPages: count / pageSize,
      })

    }catch(error){
      return ResponseFactory.error(res, 500, "Error fetching reservations");
    }
  }

  public async getAllReservations(req: Request, res: Response): Promise<Response> {
    try {
      const reservations: ReservationDto[] = await this.reservationService.getAllReservations();
      return ResponseFactory.ok(res, reservations);
    } catch (error) {
      return ResponseFactory.error(res, 500, "Error fetching reservations");
    }
  }

  public async getReservation(req: Request, res: Response): Promise<Response> {
      const reservationId: number = Number(req.params.id);
      const reservation: Role = await this.reservationService.getReservationById(reservationId);
      return ResponseFactory.ok(res, reservation);
  }

  public async addReservation(req: Request, res: Response): Promise<Response> {
      const reservationData: AddReservationRequest = req.body;

      if (!reservationData) {
        throw ErrorFactory.createBadRequestError("Invalid reservation data");
      }

      const createdReservationId: number = await this.reservationService.addReservaton(reservationData);
      return ResponseFactory.created(res, createdReservationId);
  }

  public async updateReservation(req: Request, res: Response): Promise<Response> {
      const reservationData: UpdateReservationRequest = {id: req.body.id, userId: req.body.userId, dateTo: req.body.dateTo, dateFrom: req.body.dateFrom, saunaId: req.body.saunaId, numberOfPeople: req.body.numberOfPeople};

      const isUpdated: boolean = await this.reservationService.updateReservation(reservationData);
      if (isUpdated) {
        return ResponseFactory.updated(res, "reservation");
      } else {
        throw ErrorFactory.createNotFoundError("Reservation not found");
      }

  }

  public async deleteRole(req: Request, res: Response): Promise<Response> {
      const reservationId: number = Number(req.params.id);
      const isDeleted: boolean = await this.reservationService.deleteReservation(reservationId);

      if (isDeleted) {
        return ResponseFactory.deleted(res, "reservation");
      } else {
        throw ErrorFactory.createNotFoundError("Reservation not found");
      }
  }
}

