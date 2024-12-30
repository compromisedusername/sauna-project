import { Repository } from "typeorm";
import { Sauna } from "../entities/sauna.model";
import { AddSaunaRequest } from "../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../dto/request/update.sauna.request";
import { SaunaResponse } from "../dto/response/sauna.response.dto";
import { SaunaRepository } from "../repositories/sauna.repository";
import { ReservationRepository } from "../repositories/reservation.repository";
import { ErrorFactory } from "../errors/error-factory.error";
import { validateUpdateSauna } from "../utils/validators/sauna/sauna.validator";
import { validateAddSauna } from "../utils/validators/sauna/sauna.validator";
import { UpdatedResponse } from "../dto/response/response-factory.response";
import { Reservation } from "../entities/reservation.model";

export class SaunaService {
  private readonly saunaRepository: SaunaRepository;
  private readonly reservationRepository: ReservationRepository

  constructor() {
    this.saunaRepository = new SaunaRepository();
    this.reservationRepository = new ReservationRepository();
  }

  public async getAllSaunas(): Promise<Sauna[]> {
    const saunas = await this.saunaRepository.getAllSaunas();
    return saunas;
  }

  public async getSauna(id: number): Promise<Sauna> {
    const sauna = await this.saunaRepository.getSaunaById(id);
    if (!sauna) {
      throw ErrorFactory.createNotFoundError("Sauna not found");
    }
    return sauna;
  }
  public async addSauna(data: AddSaunaRequest): Promise<number> {
    validateAddSauna(data);
    const reservations: Reservation[] = await Promise.all(data.reservations.map( (id)=>this.reservationRepository.getReservationById(id)));
    const addSauna:Sauna = {
      name: data.name,
      saunaType: data.saunaType,
      humidity: data.humidity,
      temperature: data.temperature,
      peopleCapacity: data.peopleCapacity,
      reservations: reservations,
    }

    const savedSauna = await this.saunaRepository.addSauna(addSauna);
    if(savedSauna.id){
    return savedSauna.id;}
    else{
      throw ErrorFactory.createInternalServerError("Error occured. Try again later.")
    }
  }

  public async updateSauna(data: UpdateSaunaRequest): Promise<boolean> {
    validateUpdateSauna(data);
    const sauna = await this.getSauna(data.id);
    if ((sauna && !sauna.id) || !sauna) {
      throw ErrorFactory.createNotFoundError(
        `Sauna for given ID: ${data.id} not found`,
      );
    }


    const reservations: Reservation[] = await Promise.all(data.reservations.map( (id)=>this.reservationRepository.getReservationById(id)));
    const updateSauna:Sauna = {
      id: data.id,
      name: data.name,
      saunaType: data.saunaType,
      temperature: data.temperature,
      peopleCapacity: data.peopleCapacity,
      humidity: data.humidity,
      reservations: reservations,
    }



    const updateResult = await this.saunaRepository.updateSauna(updateSauna);
    return updateResult;
  }

  public async deleteSauna(id: number): Promise<boolean> {
    const sauna = await this.getSauna(id);
    if ((sauna && !sauna.id) || !sauna) {
      throw ErrorFactory.createNotFoundError(
        `Sauna for given ID: ${id} not found`,
      );
    }
    const deleteResult = await this.saunaRepository.deleteSauna(id);
    if (!deleteResult) {
      throw ErrorFactory.createInternalServerError(
        "Internal server error, try again later.",
      );
    }
    return deleteResult;
  }
}
