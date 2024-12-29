import { DeleteResult } from "typeorm";
import { UserResponse } from "../dto/response/user.response.dto";
import { AddUserRequest } from "../dto/request/add.user.request";
import { ErrorFactory } from "../errors/error-factory.error";
import { User } from "./../entities/user.model";
import { UserRepository } from "./../repositories/user.repository";
import { UpdateUserRequest } from "../dto/request/update.user.request";

//todo ADD Role and Reservation Repository and JOIN them

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.getAllUsers();
    return users;
  }

  public async getUser(id: number): Promise<User> {
    const user: User | null = await this.userRepository.getUser(id);
    if (user) {
      return user;
    } else {
      throw ErrorFactory.createNotFoundError("User not found");
    }
  }

  public async updateUser(
    userDto: UpdateUserRequest,
  ): Promise<boolean> {
    const updated = await this.userRepository.updateUser(userDto);
    if (updated) {
      return updated;
    } else {
      throw ErrorFactory.createNotFoundError("User nout found!");
    }
  }

  public async addUser(userDto: AddUserRequest): Promise<number> {
    const user: User = await this.userRepository.addUser(userDto);
    if(user){
    return user.id;
    }else{
        throw ErrorFactory.createBadRequestError("Incorrect input")
    }
  }

  public async deleteUser(id: number): Promise<boolean> {
    const deleted: boolean = await this.userRepository.deleteUser(id);
    if (!deleted) {
      throw ErrorFactory.createNotFoundError("User not found");
    }
    return deleted;
  }
}
