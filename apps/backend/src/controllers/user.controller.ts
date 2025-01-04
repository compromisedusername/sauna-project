import { ResponseFactory } from "../dto/response/response-factory.response";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "./../entities/user.model";
import { UserService } from "../services/user.service";
import { UserResponse } from "../dto/response/user.response.dto";
import { ReservationService } from "../services/reservation.service";
import { AddUserRequest } from "../dto/request/add.user.request";
import { ErrorFactory } from "../errors/error-factory.error";
import { UpdateUserRequest } from "../dto/request/update.user.request";
import { RoleService } from "../services/role.service";
import { hashPassword } from "./../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { RegisterUserRequest } from "../dto/request/register.user.request";
import { exit } from "process";
import { Reservation } from "../entities/reservation.model";
export class UserController {
  private readonly userService: UserService;
  private readonly roleService: RoleService;
  private readonly reservationSerivce: ReservationService;
  constructor() {
    this.userService = new UserService();
    this.roleService = new RoleService();
    this.reservationSerivce = new ReservationService();
  }

public async getPaginatedUsers(req: Request, res: Response
){

    const page: number = Number(req.params.page);
    const pageSize: number = Number(req.params.pageSize);

    const [users, count]: [User[], number] = await this.userService.getPaginatedUsers(page,pageSize);
    return ResponseFactory.ok(res, {
          users: users,
      totalItems: count,
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(count / pageSize),
    })
  }

  public async getPaginatedReservationsForUser(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId: number = Number(req.params.userId);
    const page: number = Number(req.params.page);
    const pageSize: number = Number(req.params.pageSize);

    const [reservations, count]: [Reservation[], number] =
      await this.userService.getPaginatedReservationsForUser(
        userId,
        page,
        pageSize,
      );

    return ResponseFactory.ok(res, {
      reservations: reservations,
      totalItems: count,
      currentPage: page,
      pageSize: pageSize,

      totalPages: Math.ceil(count / pageSize),
    });
  }


  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users: UserResponse[] = await this.userService.getAllUsers();
    return ResponseFactory.ok(res, users);
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const id: number = Number(req.params.id);

    const user: UserResponse = await this.userService.getUserById(Number(id));

    return ResponseFactory.ok(res, user);
  }

  public async addUser(req: Request, res: Response): Promise<Response> {
    const user: AddUserRequest = req.body;
    if (!user) {
      throw ErrorFactory.createBadRequestError("Invalid request");
    }
    const result: number = await this.userService.addUser(user);

    return ResponseFactory.created(res, result);
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const request = req.body;
    const userDto: UpdateUserRequest = {
      userId: request.userId,
      name: request.name,
      surname: request.surname,
      email: request.email,
      passwordHash: request.passwordHash,
      role: request.role,
      reservations: request.reservations,
    };
    const result: boolean = await this.userService.updateUser(userDto);
    if (result) {
      return ResponseFactory.updated(res, "user");
    } else {
      return ResponseFactory.error(res, 400, "Bad request");
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    let userId;
    if (req.params.id) {
      userId = Number(req.params.id);
    } else {
      throw ErrorFactory.createBadRequestError("Invalid request");
    }

    const result: boolean = await this.userService.deleteUser(userId);
    if (result) return ResponseFactory.deleted(res, "user");
    else return ResponseFactory.error(res, 404, "user not found");
  }
}
