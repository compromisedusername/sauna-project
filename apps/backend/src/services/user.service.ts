import { AddUserRequest } from "../dto/request/add.user.request";
import { ErrorFactory } from "../errors/error-factory.error";
import { User } from "./../entities/user.model";
import { UserRepository } from "./../repositories/user.repository";
import { UpdateUserRequest } from "../dto/request/update.user.request";
import { Role } from "../entities/role.model";
import { Reservation } from "../entities/reservation.model";
import {
  validateAddUser,
  validateUpdateUser,
} from "../utils/validators/user/user.validator";
import { RoleRepository } from "../repositories/role.repository";
import { ReservationRepository } from "../repositories/reservation.repository";
export class UserService {
  private readonly userRepository: UserRepository;
  private readonly roleRepository: RoleRepository;
  private readonly reservationRepository: ReservationRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.roleRepository = new RoleRepository();
    this.reservationRepository = new ReservationRepository();
  }

  public async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.getAllUsers();
    return users;
  }

  public async getUser(id: number): Promise<User> {
    const user: User | null = await this.userRepository.getUserById(id);
    if (user) {
      return user;
    } else {
      throw ErrorFactory.createNotFoundError("User not found");
    }
  }

  public async updateUser(data: UpdateUserRequest): Promise<boolean> {
    validateUpdateUser(data);

    const role: Role = await this.roleRepository.getRoleById(data.role);

    const reservations: Reservation[] = await Promise.all(
      data.reservations.map((id) =>
        this.reservationRepository.getReservationById(id),
      ),
    );

    const updatedUser: User = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      passwordHash: data.passwordHash,
      salt: data.salt,
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
      passwordHash: data.passwordHash,
      salt: data.salt,
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
