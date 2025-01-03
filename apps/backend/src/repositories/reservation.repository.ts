import { ErrorFactory } from "./../errors/error-factory.error";
import { Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
import { Reservation } from "../entities/reservation.model";
import { User } from "../entities/user.model";
export class ReservationRepository {
  protected readonly reservationRepository: Repository<Reservation> =
    AppDataSource.getRepository(Reservation);

  public async getAllReservations(): Promise<Reservation[]> {
    const reservations: Reservation[] = await this.reservationRepository.find({
      relations: ["sauna", "user"],
    });
    return reservations;
  }

  public async getReservationByUserIdPaginated(
    user: User,
    page: number,
    pageSize: number,
  ): Promise<[Reservation[], number]> {
    const [result, count]: [Reservation[], number] =
      await this.reservationRepository.findAndCount({
        where: { user: user },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });


    return [result, count];
  }

  public async getReservationById(id: number): Promise<Reservation> {
    try {
      const reservation: Reservation | null =
        await this.reservationRepository.findOne({
          where: { id: id },
          relations: ["user", "sauna"],
        });
      if (reservation) return reservation;
      else
        throw ErrorFactory.createNotFoundError(
          `Reservation for ID: ${id} not found`,
        );
    } catch (error) {
      throw error;
    }
  }

  public async addReservation(
    addedReservation: Reservation,
  ): Promise<Reservation> {
    try {
      const reservation = this.reservationRepository.create(addedReservation);
      const result = await this.reservationRepository.save(reservation);
      return result;
    } catch (error) {
      throw ErrorFactory.createInternalServerError(
        "Add reservation failed",
        error,
      );
    }
  }

  public async updateReservation(
    updatedReservation: Reservation,
  ): Promise<boolean> {
    try {
      const result = this.reservationRepository.merge(updatedReservation);
      return result ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError(
        "Update reservation failed",
        error,
      );
    }
  }

  public async deleteReservation(id: number): Promise<boolean> {
    try {
      const result = await this.reservationRepository.delete(id);
      return result.affected !== 0 ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError(
        "Delete reservation failed",
        error,
      );
    }
  }
}
