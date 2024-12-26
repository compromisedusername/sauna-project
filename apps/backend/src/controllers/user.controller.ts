import {Request, Response } from 'express';
import {Repository} from 'typeorm';
import {User} from './../entities/user.model'
import { UserService } from '../services/user.service';
export class UserController{
  private readonly userService: UserService;

  constructor(){
    this.userService = new UserService()
  }

  public async getAllUsers(req: Request, res: Response):Promise<Response>{

    // walidacja itp
    //
        const users : User[] = await this.userService.getAllUsers();
        return res.status(200).json(users);

  }

  public async getUser(req: Request, res: Response): Promise<Response> {
      const id : number = Number(req.params.id);
      const user : User = await this.userService.getUser(Number(id))

    return res.status(200).json(user);
  }
}
