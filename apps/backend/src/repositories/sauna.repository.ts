import { ErrorFactory } from "./../errors/error-factory.error";
import { Sauna } from "./../entities/sauna.model";
import { Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
export class SaunaRepository {
  protected readonly saunaRepository: Repository<Sauna> =
    AppDataSource.getRepository(Sauna);

  public async getAllSaunas(): Promise<Sauna[]> {
    const users: Sauna[] = await this.saunaRepository.find();
    return users;
  }

  public async getSaunaById(id: number): Promise<Sauna | null> {
    try {
      const user: Sauna | null = await this.saunaRepository.findOneBy({
        id: id,
      });
      return user;
    } catch (error) {
      throw ErrorFactory.createInternalServerError(
        `Finding sauna failed`,
        error,
      );
    }
  }

  public async addSauna(addSauna:Sauna ): Promise<Sauna> {
    try {

      const sauna = this.saunaRepository.create(addSauna);
      const result = await this.saunaRepository.save(sauna);
      return result;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Add sauna failed", error);
    }
  }

  public async updateSauna(updateSauna:Sauna): Promise<boolean> {
    try {
      const sauna: Sauna = await this.saunaRepository.findOneByOrFail({
        id: updateSauna.id,
      });
      const result = this.saunaRepository.merge(sauna, updateSauna);
      return result ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Update user failed", error);
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
