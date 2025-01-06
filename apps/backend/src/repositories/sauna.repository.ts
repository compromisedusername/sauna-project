import { ErrorFactory } from "./../errors/error-factory.error";
import { Sauna } from "./../entities/sauna.model";
import { IsNull, Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
export class SaunaRepository {
  protected readonly saunaRepository: Repository<Sauna> =
    AppDataSource.getRepository(Sauna);

  public async getAllSaunas(): Promise<Sauna[]> {
    const users: Sauna[] = await this.saunaRepository.find({
      relations: ["reservations"],
    });
    return users;
  }

  public async getSaunaById(id: number): Promise<Sauna> {
    try {
      const sauna: Sauna | null = await this.saunaRepository.findOne({
        where: {
          id: id,
        },
        relations: ["reservations"],
      });
      if (sauna) {
        return sauna;
      } else {
        throw ErrorFactory.createNotFoundError(
          `Sauna with ID: ${id} not found`,
        );
      }
    } catch (error) {
       throw error

    }
  }

  public async addSauna(addSauna: Sauna): Promise<Sauna> {
    try {
      const sauna = this.saunaRepository.create(addSauna);
      const result = await this.saunaRepository.save(sauna);
      return result;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Add sauna failed", error);
    }
  }

  public async getAllSaunasWithoutReservation(): Promise<Sauna[]> {
    try {
      return await this.saunaRepository.createQueryBuilder('sauna')
        .leftJoin('sauna.reservations', 'reservation')
        .where('reservation.id IS NULL')
      .getMany();
    } catch (error: any) {
      throw ErrorFactory.createInternalServerError("Try again later", error);
    }
  }

  public async updateSauna(updateSauna: Sauna): Promise<boolean> {
    try {
      const sauna: Sauna = await this.saunaRepository.findOneByOrFail({
        id: updateSauna.id,
      });
      const merged = this.saunaRepository.merge(sauna, updateSauna);
      const result = await this.saunaRepository.save(merged);
      return result ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError(
        "Update sauna failed",
        error,
      );
    }
  }


  public async getSaunasForGuests(): Promise<Sauna[]>{
        try{
          return this.saunaRepository.find();
    }catch(error){
      throw ErrorFactory.createInternalServerError("Try again later", error);
    }
  }

  public async deleteSauna(id: number): Promise<boolean> {
    try {
      const result = await this.saunaRepository.delete(id);
      return result.affected !== 0 ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError(
        "Delete sauna failed",
        error,
      );
    }
  }
}
