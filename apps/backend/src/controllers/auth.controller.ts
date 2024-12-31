import { UserService } from "../services/user.service";
import { generateToken } from "../utils/jwt";
import { ResponseFactory } from "../dto/response/response-factory.response";
import { RoleService } from "../services/role.service";
import { AddUserRequest } from "../dto/request/add.user.request";
import { Request, Response } from "express";
import { ErrorFactory } from "../errors/error-factory.error";
import { User } from "../entities/user.model";
import { hashPassword, generateSalt } from "../utils/bcrypt";
export class AuthController{

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

    return res.json(jwtToken);

  }
  public async loginUser(req: Request, res: Response): Promise<Response> {
      const {email, password} = req.body;
    if(!email || !password){
          throw ErrorFactory.createBadRequestError("Input email and password.")
    }
    const passwordHash: string = await hashPassword(password);
    const existingUser: User = await this.userService.getUserByEmailAndPassword(email, passwordHash)

    const jwtToken: string = generateToken(existingUser);

  return res.json(jwtToken)
  }
}
