import {User} from './../entities/user.model'
import {UserRepository }from './../repositories/user.repository'

export class UserService{
  private readonly userRepository: UserRepository

  constructor(){
    this.userRepository = new UserRepository()
  }

  public async getAllUsers(): Promise<User[]>{
    return this.userRepository.getAllUsers();
  }

  public async getUser(id: number): Promise<User> {
    return this.userRepository.getUser(id);
  }
}
