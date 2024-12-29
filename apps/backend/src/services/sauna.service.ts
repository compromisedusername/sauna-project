import { Repository } from "typeorm";
import { Sauna } from "../entities/sauna.model";
import { AddSaunaRequest } from "../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../dto/request/update.sauna.request";
import { SaunaResponse } from "../dto/response/sauna.response.dto";
import { SaunaRepository } from "../repositories/sauna.repository";
import { ErrorFactory } from "../errors/error-factory.error";
import { validateUpdateSauna } from "../utils/validators/sauna/sauna.validator";
import { validateAddSauna } from "../utils/validators/sauna/sauna.validator";

export class SaunaService {
  private readonly saunaRepository: SaunaRepository;

  constructor() {
    this.saunaRepository = new SaunaRepository();
  }

  public async getAllSaunas(): Promise<Sauna[]> {
    const saunas = await this.saunaRepository.getAllSaunas();
    return saunas;
  }

  public async getSauna(id: number): Promise<Sauna> {
    const sauna = await this.saunaRepository.getSauna(id);
    if (!sauna) {
      throw ErrorFactory.createNotFoundError("Sauna not found");
    }
    return sauna;
  }
  public async addSauna(data: AddSaunaRequest): Promise<number> {
    validateAddSauna(data);
    const savedSauna = await this.saunaRepository.addSauna(data);
    return savedSauna.id;
  }

  public async updateSauna(data: UpdateSaunaRequest): Promise<boolean> {
    validateUpdateSauna(data);
    const sauna = await this.getSauna(data.id);
    if ((sauna && !sauna.id) || !sauna) {
      throw ErrorFactory.createNotFoundError(
        `Sauna for given ID: ${data.id} not found`,
      );
    }

    const updateResult = await this.saunaRepository.updateSauna(data);
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
