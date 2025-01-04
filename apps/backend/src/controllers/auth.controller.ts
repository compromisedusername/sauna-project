
import { ResponseFactory } from "../dto/response/response-factory.response";
import { Request, Response } from "express";
import { User } from "./../entities/user.model";
import { UserService } from "../services/user.service";
import { AddUserRequest } from "../dto/request/add.user.request";
import { ErrorFactory } from "../errors/error-factory.error";
import { RoleService } from "../services/role.service";
import { hashPassword } from "./../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { RegisterUserRequest } from "../dto/request/register.user.request";
export class AuthController{

  private readonly userService: UserService;
  private readonly roleService: RoleService;
  constructor() {
    this.userService = new UserService();
    this.roleService = new RoleService();
  }



public async registerUser(req: Request, res: Response): Promise<Response> {
    const role = await this.roleService.getRoleByName("user");
    if (!role) {
      throw ErrorFactory.createNotFoundError(`Role name user not found`);
    }
    const userRequest: RegisterUserRequest = req.body;

    const user: AddUserRequest = {
      name: userRequest.name,
      surname: userRequest.surname,
      email: userRequest.email,
      passwordHash: await hashPassword(userRequest.password),
      role: role.id ? role.id : 1,
      reservations: [],
    };

    const addedUserId: number = await this.userService.addUser(user);

    const userForJwt: User = {
      id: addedUserId,
      email: user.email,
      role: role,
      name: userRequest.name,
      surname: userRequest.name,
    };

    const jwtToken: string = generateToken(userForJwt);

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 360000,
    });
    return ResponseFactory.registered(res, jwtToken);
  }
  public async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    if (!email || !password) {
      throw ErrorFactory.createBadRequestError("Input email and password.");
    }
    const existingUser: User =
      await this.userService.getUserByEmailAndComparePassword(email, password);

    const userForJwt: User = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      name: existingUser.name,
      surname: existingUser.name,
    };
    const jwtToken: string = generateToken(userForJwt);

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 360000,
    });
    return ResponseFactory.logged(res, jwtToken);
  }}
