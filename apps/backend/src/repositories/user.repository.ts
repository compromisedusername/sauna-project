import { ErrorFactory } from "./../errors/error-factory.error";
import { User } from "./../entities/user.model";
import { Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
import { comparePasswords } from "../utils/bcrypt";
export class UserRepository {
  protected readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  public async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find({
      relations: ["reservations", "role"],
    });
    return users;
  }

  public async userExistsById(id: number): Promise<boolean> {
    try {
      const exists: boolean = await this.userRepository.existsBy({id: id});
      return exists;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(id: number): Promise<User> {
    try {
      const user: User | null = await this.userRepository.findOne({
        where: { id: id },
        relations: ["reservations", "role"],
      });
      if (user) return user;
      else
        throw ErrorFactory.createNotFoundError(`User for ID: ${id} not found`);
    } catch (error) {
      throw error;
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOneOrFail({
        where: { email: email },
        relations: ["reservations", "role"],
      });
      return user;
    } catch (error) {
      throw ErrorFactory.createNotFoundError("Invalid credentials.", error);
    }
  }

  public async addUser(addUser: User): Promise<User> {
    try {
      const user = this.userRepository.create(addUser);
      const result = await this.userRepository.save(user);
      return result;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Add user failed", error);
    }
  }

  public async updateUser(updatedUser: User): Promise<boolean> {
    try {
      const user: User = await this.userRepository.findOneByOrFail({
        id: updatedUser.id,
      });
      const result = this.userRepository.merge(user, updatedUser);
      const updated = await this.userRepository.save(result);
      return updated ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Update user failed", error);
    }
  }

  public async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await this.userRepository.delete(id);
      return result.affected !== 0 ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Delete user failed", error);
    }
  }
}
