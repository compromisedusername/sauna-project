import { AddUserRequest } from "../dto/request/add.user.request";
import { ErrorFactory } from "../errors/error-factory.error";
import { User } from "./../entities/user.model";
import { UserRepository } from "./../repositories/user.repository";

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
    return await this.userRepository.getUser(id);
  }

  public async updateUser(userId: number, userDto: AddUserRequest): Promise<boolean>{
      const result = await this.userRepository.updateUser(userId, userDto);
      return result ? true : false;
  }

  public async addUser(userDto: AddUserRequest){
        const result = await this.userRepository.addUser(userDto);
    return result ? result : 0;
  }

  public async deleteUser(){

  }
}
