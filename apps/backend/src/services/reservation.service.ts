import { Sauna } from "../entities/sauna.model";
import { ErrorFactory } from "../errors/error-factory.error";
import { User } from "../entities/user.model";
import { UserRepository } from "../repositories/user.repository";
import { Reservation } from "../entities/reservation.model";
import { AddReservationRequest } from "../dto/request/add.reservation.request";
import {
  validateAddReservation,
  validateUpdateReservation,
} from "../utils/validators/reservation/reservation.validator";
import { SaunaRepository } from "../repositories/sauna.repository";
import { UpdateReservationRequest } from "../dto/request/update.reservation.request";
import { ReservationRepository } from "../repositories/reservation.repository";

export class ReservationService {
  private readonly reservationRepository: ReservationRepository;
  private readonly userRepository: UserRepository;
  private readonly saunaRepository: SaunaRepository;
  constructor() {
    this.reservationRepository = new ReservationRepository();
    this.userRepository = new UserRepository();
    this.saunaRepository = new SaunaRepository();
  }

  public async getAllReservations(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.getAllReservations();
    return reservations;
  }

  public async getReservationById(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.getReservationById(id);

    if (!reservation) {
      throw ErrorFactory.createNotFoundError("Reservation not found");
    }
    return reservation;
  }
  public async addReservaton(data: AddReservationRequest): Promise<number> {
    validateAddReservation(data);

    const sauna: Sauna = await this.saunaRepository.getSaunaById(data.saunaId);

    const user: User = await this.userRepository.getUserById(data.userId);

    if (!sauna) {
      throw ErrorFactory.createNotFoundError(
        `Sauna with given ID: ${data.saunaId} not found`,
      );
    }
    if (!user) {
      throw ErrorFactory.createNotFoundError(
        `User with given ID: ${data.userId} not found`,
      );
    }

    const addedReservation: Reservation = {
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      numberOfPeople: data.numberOfPeople,
      sauna: sauna,
      user: user,
    };

    const savedReservation =
      await this.reservationRepository.addReservation(addedReservation);
    if (savedReservation.id) {
      return savedReservation.id;
    } else {
      throw ErrorFactory.createInternalServerError(
        "Error occured. Try again later",
      );
    }
  }

  public async updateReservation(
    data: UpdateReservationRequest,
  ): Promise<boolean> {
    validateUpdateReservation(data);
    const reservation = await this.reservationRepository.getReservationById(
      data.id,
    );
    if ((reservation && !reservation.id) || !reservation) {
      throw ErrorFactory.createNotFoundError(
        `Reservation for given ID: ${data.id} not found`,
      );
    }

    const sauna: Sauna = await this.saunaRepository.getSaunaById(data.saunaId);

    const user: User = await this.userRepository.getUserById(data.userId);

    if (!sauna) {
      throw ErrorFactory.createNotFoundError(
        `Sauna with given ID: ${data.saunaId} not found`,
      );
    }
    if (!user) {
      throw ErrorFactory.createNotFoundError(
        `User with given ID: ${data.userId} not found`,
      );
    }

    const updatedReservation: Reservation = {
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      numberOfPeople: data.numberOfPeople,
      sauna: sauna,
      user: user,
    };

    const savedReservation =
      await this.reservationRepository.updateReservation(updatedReservation);

    return savedReservation;
  }

  public async deleteReservation(id: number): Promise<boolean> {
    const role = await this.reservationRepository.getReservationById(id);
    if ((role && !role.id) || !role) {
      throw ErrorFactory.createNotFoundError(
        `Reservation for given ID: ${id} not found`,
      );
    }
    const deleteResult = await this.reservationRepository.deleteReservation(id);
    if (!deleteResult) {
      throw ErrorFactory.createInternalServerError(
        "Internal server error, try again later.",
      );
    }
    return deleteResult;
  }
}
