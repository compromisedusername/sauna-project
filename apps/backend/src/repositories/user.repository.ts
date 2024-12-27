import { ErrorFactory } from "./../errors/error-factory.error";
import { User } from "./../entities/user.model";
import { Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
import { OkResponse } from "../dto/response/responses.response";
import { AddUserRequest } from "../dto/request/add.user.request";
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

  public async addUser(userDto: AddUserRequest): Promise<number> {
    try {
      const result = await this.userRepository.create(userDto);
      return result.id;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Add user failed", error);
    }
  }

  public async updateUser(
    userId: number,
    userDto: AddUserRequest,
  ): Promise<boolean> {

    try{
    const user: User = await this.userRepository.findOneByOrFail({id: userId});
    const result = await this.userRepository.merge(user, userDto);
    return result ? (true) : (false)
    }catch(error){
        throw ErrorFactory.createInternalServerError("Update user failed");
    }


  }

  public async deleteUser(id: number): Promise<boolean> {
    try{
    const result = await this.userRepository.delete(id);

      return (result ?  true: false);
    }catch(error){
      throw ErrorFactory.createInternalServerError("Delete user failed");
    }
  }
}
