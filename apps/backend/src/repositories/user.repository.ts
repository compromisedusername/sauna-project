import { ErrorFactory } from "./../errors/error-factory.error";
import { User } from "./../entities/user.model";
import { Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
export class UserRepository {
  protected readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  public async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  public async getUser(id: number): Promise<User> {
      const user: User | null = await this.userRepository.findOneBy({ id: id });
      if (user) {
        return user;
      } else {
        throw ErrorFactory.createNotFoundError(`User with ID: ${id} not found.`);
      }
  }
}
