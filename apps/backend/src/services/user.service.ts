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
}
