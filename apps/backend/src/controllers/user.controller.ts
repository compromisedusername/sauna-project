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
import {  hashPassword } from "./../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { RegisterUserRequest } from "../dto/request/register.user.request";
import { exit } from "process";

export class UserController {
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
		return ResponseFactory.registered(res, jwtToken, userForJwt);
	}
	public async loginUser(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		if (!email || !password) {
			throw ErrorFactory.createBadRequestError("Input email and password.");
		}
		const existingUser: User = await this.userService.getUserByEmailAndComparePassword(
			email,
			password,
		);

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
		return ResponseFactory.logged(res, jwtToken, userForJwt);
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
			userId: request.userId ,
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
