import { Sauna } from "../entities/sauna.model";
import { ErrorFactory } from "../errors/error-factory.error";
import { User } from "../entities/user.model";
import { UserRepository } from "../repositories/user.repository";
import { Reservation } from "../entities/reservation.model";
import { AddReservationRequest } from "../dto/request/add.reservation.request";
import { ReservationDto } from "../dto/response/reservation.response.dto";
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


public async getReservationsWithoutUser(): Promise<ReservationDto[]>{
    const result = await this.reservationRepository.getReservationsWithourUser();
    return result;

  }

public async getAllReservationsPaginated(page: number, pageSize: number): Promise<[ReservationDto[], number]>{

    const [reservations, count]  = await this.reservationRepository.getAllReservationsPaginated(page, pageSize);

    const reservationsResponse: ReservationDto[] = reservations.map(
      (reservation) => {
        return {
          id: reservation.id,
          dateFrom: reservation.dateFrom,
          dateTo: reservation.dateTo,
          numberOfPeople: reservation.numberOfPeople,
          sauna: reservation.sauna,
          user: reservation.user
            ? {
              id: reservation.user.id,
              name: reservation.user.name,
              surname: reservation.user.surname,
              email: reservation.user.email,
            }
            : undefined,
        };
      },
    );

    return [reservationsResponse, count];


  }

  public async getAllReservations(): Promise<ReservationDto[]> {
    const reservations = await this.reservationRepository.getAllReservations();

    const reservationsResponse: ReservationDto[] = reservations.map(
      (reservation) => {
        return {
          id: reservation.id,
          dateFrom: reservation.dateFrom,
          dateTo: reservation.dateTo,
          numberOfPeople: reservation.numberOfPeople,
          sauna: reservation.sauna,
          user: reservation.user
            ? {
              id: reservation.user.id,
              name: reservation.user.name,
              surname: reservation.user.surname,
              email: reservation.user.email,
            }
            : undefined,
        };
      },
    );

    return reservationsResponse;
  }

  public async getReservationById(id: number): Promise<ReservationDto> {
    const reservation = await this.reservationRepository.getReservationById(id);

    if (!reservation) {
      throw ErrorFactory.createNotFoundError("Reservation not found");
    }

    const reservationResponse: ReservationDto =
      {
        id: reservation.id,
        dateFrom: reservation.dateFrom,
        dateTo: reservation.dateTo,
        numberOfPeople: reservation.numberOfPeople,
        sauna: reservation.sauna,
        user:  {
              id: reservation.user?.id,
              name: reservation.user?.name,
              surname: reservation.user?.surname,
              email: reservation.user?.email,
            }
      }




    return reservationResponse;
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
    const reservation = await this.reservationRepository.getReservationById(
      data.id,
    );
    if ((reservation && !reservation.id) || !reservation) {
      throw ErrorFactory.createNotFoundError(
        `Reservation for given ID: ${data.id} not found`,
      );
    }


let correctSaunaId;

    let correctUserId;

    if(data.saunaId){
        correctSaunaId = data.saunaId
    }else{
    const reservation: Reservation = await this.reservationRepository.getReservationById(data.id);
    correctSaunaId = reservation.sauna?.id;
    }

    if(data.userId){
    correctUserId = data.userId
    }else{
    const reservation: Reservation = await this.reservationRepository.getReservationById(data.id);
    correctUserId = reservation.user?.id;
    }

    const sauna: Sauna = await this.saunaRepository.getSaunaById(correctSaunaId!);

    const user: User = await this.userRepository.getUserById(correctUserId!);

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
      id: data.id,
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
