import { AddUserRequest } from "../dto/request/add.user.request";
import { ErrorFactory } from "../errors/error-factory.error";
import { User } from "./../entities/user.model";
import { UserRepository } from "./../repositories/user.repository";
import { UpdateUserRequest } from "../dto/request/update.user.request";
import { Role } from "../entities/role.model";
import { Reservation } from "../entities/reservation.model";
import { comparePasswords, hashPassword } from "../utils/bcrypt";
import {
  validateAddUser,
  validateUpdateUser,
} from "../utils/validators/user/user.validator";
import { RoleRepository } from "../repositories/role.repository";
import { ReservationRepository } from "../repositories/reservation.repository";
import { UserNoReservations } from "../dto/response/user.response.dto";
export class UserService {
  private readonly userRepository: UserRepository;
  private readonly roleRepository: RoleRepository;
  private readonly reservationRepository: ReservationRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.roleRepository = new RoleRepository();
    this.reservationRepository = new ReservationRepository();
  }


  public async getPaginatedUsers(page: number, pageSize: number){
    const result: [User[], number] = await this.userRepository.getPaginatedUsers(page,pageSize);
    return result;
  }

  public async getPaginatedReservationsForUser(
    userId: number,
    page: number,
    pageSize: number,
  ) {

    const user = await this.userRepository.getUserById(userId);

    const result: [ Reservation[], number] =
      await this.reservationRepository.getReservationByUserIdPaginated(
        user,
        page,
        pageSize,
      );

    return result;
  }
  public async getUserByEmailAndComparePassword(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user: User = await this.userRepository.getUserByEmail(email);

      const result: boolean = await comparePasswords(
        password,
        user.passwordHash!,
      );
      if (result) {
        return user;
      } else {
        throw ErrorFactory.createConflictError("Incorrect credentials.");
      }
    } catch (error) {
      throw error;
    }
  }
  public async getAllUsers(withReservation:boolean): Promise<User[] | UserNoReservations[]> {

    if(withReservation) {
      return await this.userRepository.getAllUsers();
    }else{
      const users: User[] = await this.userRepository.getAllusersWithourReservation();
      const usersWithoutReservations: UserNoReservations[] = users.map( (user) => ({
          id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: {
          name: user.role?.name,
          description: user.role?.description
        }

      }))
      return usersWithoutReservations;
    }

  }

  public async getUserById(id: number): Promise<User> {
    const user: User | null = await this.userRepository.getUserById(id);
    if (user) {
      return user;
    } else {
      throw ErrorFactory.createNotFoundError("User not found");
    }
  }

  public async updateUser(data: UpdateUserRequest): Promise<boolean> {
    validateUpdateUser(data);

    const existingUser = await this.userRepository.getUserById(data.userId);

    let reservations: Reservation[];

    if (!data.reservations) {
      reservations = existingUser.reservations!;
    } else {
      reservations = await Promise.all(
        data.reservations.map((id) =>
          this.reservationRepository.getReservationById(id),
        ),
      );
    }

    let role: Role = data.role
      ? await this.roleRepository.getRoleById(data.role)
      : existingUser.role!;

    const updatedUser: User = {
      id: data.userId,
      name: data.name ? data.name : existingUser.name,
      surname: data.surname ? data.surname : existingUser.surname,
      email: data.email ? data.email : existingUser.email,
      passwordHash: data.passwordHash
        ? await hashPassword(data.passwordHash)
        : existingUser.passwordHash,
      role: role,
      reservations: reservations,
    };

    const updated = await this.userRepository.updateUser(updatedUser);
    if (updated) {
      return updated;
    } else {
      throw ErrorFactory.createNotFoundError("User nout found!");
    }
  }

  public async addUser(data: AddUserRequest): Promise<number> {
    validateAddUser(data);
    const role: Role = await this.roleRepository.getRoleById(data.role);
    const reservations: Reservation[] = await Promise.all(
      data.reservations.map((id) =>
        this.reservationRepository.getReservationById(id),
      ),
    );
    const addUser: User = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      passwordHash: await hashPassword(data.passwordHash!),
      role: role,
      reservations: reservations,
    };
    const user: User = await this.userRepository.addUser(addUser);
    if (user.id) {
      return user.id;
    } else {
      throw ErrorFactory.createBadRequestError("Incorrect input");
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
