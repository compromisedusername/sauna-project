
import { Request, Response } from "express";
import { ResponseFactory } from "../dto/response/response-factory.response";
import { ErrorFactory } from "../errors/error-factory.error";
import { SaunaService } from "../services/sauna.service";
import { SaunaResponse } from "../dto/response/sauna.response.dto";
import { AddSaunaRequest } from "../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../dto/request/update.sauna.request";
import { RoleService } from "../services/role.service";
import { Role } from "../entities/role.model";
import { AddRoleRequest } from "../dto/request/add.role.request";
import { UpdateRoleRequest } from "../dto/request/update.role.request";
import { RoleWithourUser } from "../dto/response/role.response.dto";

export class RoleController {
  private readonly roleSerivce: RoleService;

  constructor() {
    this.roleSerivce = new RoleService();
  }

  public async getAllRoles(req: Request, res: Response): Promise<Response> {
    try {
      const getUsers:boolean = (req.query.users === 'true');
      const roles: Role[] |RoleWithourUser[]= await this.roleSerivce.getAllRoles(getUsers);

      return ResponseFactory.ok(res, roles);
    } catch (error) {
      return ResponseFactory.error(res, 500, "Error fetching roles");
    }
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
      const roleId: number = Number(req.params.id);
      const role: Role = await this.roleSerivce.getRole(roleId);
      return ResponseFactory.ok(res, role);
  }

  public async addRole(req: Request, res: Response): Promise<Response> {
      const roleData: AddRoleRequest = req.body;

      if (!roleData) {
        throw ErrorFactory.createBadRequestError("Invalid role data");
      }

      const createdRoleId: number = await this.roleSerivce.addRole(roleData);
      return ResponseFactory.created(res, createdRoleId);
  }

  public async updateRole(req: Request, res: Response): Promise<Response> {
      const roleData: UpdateRoleRequest = req.body;

      const isUpdated: boolean = await this.roleSerivce.updateRole(roleData);
      if (isUpdated) {
        return ResponseFactory.updated(res, "Role");
      } else {
        throw ErrorFactory.createNotFoundError("Role not found");
      }

  }

  public async deleteRole(req: Request, res: Response): Promise<Response> {
      const roleId: number = Number(req.params.id);
      const isDeleted: boolean = await this.roleSerivce.deleteRole(roleId);

      if (isDeleted) {
        return ResponseFactory.deleted(res, "Role");
      } else {
        throw ErrorFactory.createNotFoundError("Role not found");
      }
  }
}

