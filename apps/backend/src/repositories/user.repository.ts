import { ErrorFactory } from "./../errors/error-factory.error";
import { User } from "./../entities/user.model";
import { Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
import { OkResponse } from "../dto/response/responses.response";
import { AddUpdateUserRequest } from "../dto/request/add.user.request";
export class UserRepository {
  protected readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  public async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  public async getUser(id: number): Promise<User | null> {
    try{
    const user: User | null = await this.userRepository.findOneBy({ id: id });
      return user;
    }catch(error){
      throw ErrorFactory.createInternalServerError(`Finding user failed`,error);
    }
  }

  public async addUser(userDto: AddUpdateUserRequest): Promise<User> {
    try {
      const user = this.userRepository.create(userDto);
      const result = await this.userRepository.save(user);
      return result;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Add user failed", error);
    }
  }

  public async updateUser(
    userId: number,
    userDto: AddUpdateUserRequest,
  ): Promise<boolean> {
    try {
      const user: User = await this.userRepository.findOneByOrFail({
        id: userId,
      });
      const result = await this.userRepository.merge(user, userDto);
      return result ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Update user failed",error);
    }
  }

  public async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await this.userRepository.delete(id);
      return result.affected !== 0 ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Delete user failed",error);
    }
  }
}
