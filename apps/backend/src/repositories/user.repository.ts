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

  public async getUserById(id: number): Promise<User> {
    try{
    const user: User | null = await this.userRepository.findOneBy({ id: id });
      if(user)
      return user;
      else
      throw ErrorFactory.createNotFoundError(`User for ID: ${id} not found`)

    }catch(error){
      throw ErrorFactory.createInternalServerError(`Finding user failed`,error);
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

  public async updateUser(
    updatedUser:User,
  ): Promise<boolean> {
    try {
      const user: User = await this.userRepository.findOneByOrFail({
        id: updatedUser.id,
      });
      const result = await this.userRepository.merge(user, updatedUser);
      const updated = await this.userRepository.save(result);
      return updated ? true : false;
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
