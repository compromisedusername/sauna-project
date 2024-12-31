import { ResponseFactory } from "../dto/response/response-factory.response";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "./../entities/user.model";
import { UserService } from "../services/user.service";
import { UserResponse } from "../dto/response/user.response.dto";
import { AddUserRequest } from "../dto/request/add.user.request";
import { ErrorFactory } from "../errors/error-factory.error";
import { UpdateUserRequest } from "../dto/request/update.user.request";
import { RoleService } from "../services/role.service";
import { generateSalt, hashPassword } from './../utils/bcrypt';
import { generateToken } from "../utils/jwt";

export class UserController {

  private readonly userService: UserService;
  private readonly roleService: RoleService;
  constructor() {
    this.userService = new UserService();
    this.roleService = new RoleService();
  }
  public async registerUser(req: Request, res: Response): Promise<Response> {
    const role = await this.roleService.getRoleByName("user")
    if(!role){
      throw ErrorFactory.createNotFoundError(`Role name user not found`);
    }
    const user: AddUserRequest = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      passwordHash: await hashPassword(req.body.password),
      salt: await generateSalt(),
      role: (role.id ? role.id : 1),
      reservations: [],
    };

   const addedUserId: number = await this.userService.addUser(user)

    const userForJwt: User = {
      id: addedUserId,
      email: user.email,
      role: role,
      // other ??
    }

    const jwtToken: string = generateToken(userForJwt);

    return ResponseFactory.registered(res, jwtToken, userForJwt)

  }
  public async loginUser(req: Request, res: Response): Promise<Response> {
      const {email, password} = req.body;
    if(!email || !password){
          throw ErrorFactory.createBadRequestError("Input email and password.")
    }
    const passwordHash: string = await hashPassword(password);
    const existingUser: User = await this.userService.getUserByEmailAndPassword(email, passwordHash)

    const jwtToken: string = generateToken(existingUser);

    return ResponseFactory.logged(res, jwtToken, existingUser);

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
      throw ErrorFactory.createBadRequestError("Invalid request")
    }
    const result: number = await this.userService.addUser(user);

    return ResponseFactory.created(res, result);
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const request = req.body;
    const userDto: UpdateUserRequest = {
      id: request.id,
      name: request.name,
      surname: request.surname,
      email: request.email,
      passwordHash: request.passwordHash,
      salt: request.salt,
      role: request.role,
      reservations: request.reservations

    }
    const result: boolean = await this.userService.updateUser(userDto);
    if (result) {
      return ResponseFactory.updated(res, "user");
    }
    else {
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
    if (result)
      return ResponseFactory.deleted(res, "user")
    else return ResponseFactory.error(res, 404, "user not found")
  }
}

