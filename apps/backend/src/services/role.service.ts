import { Repository } from "typeorm";
import { Sauna } from "../entities/sauna.model";
import { AddSaunaRequest } from "../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../dto/request/update.sauna.request";
import { SaunaResponse } from "../dto/response/sauna.response.dto";
import { SaunaRepository } from "../repositories/sauna.repository";
import { ErrorFactory } from "../errors/error-factory.error";
import { validateUpdateSauna } from "../utils/validators/sauna/sauna.validator";
import { validateAddSauna as validateAddSauna } from "../utils/validators/sauna/sauna.validator";
import { AddRoleRequest } from "../dto/request/add.role.request";
import { Role } from "../entities/role.model";
import {
  validateAddRole,
  validateUpdateRole,
} from "../utils/validators/role/role.validator";
import { User } from "../entities/user.model";
import { UpdateRoleRequest } from "../dto/request/update.role.request";
import { UserRepository } from "../repositories/user.repository";
import { RoleRepository } from "../repositories/role.repository";

export class RoleService {
  private readonly roleRepository: RoleRepository;
  private readonly userRepository: UserRepository;
  constructor() {
    this.roleRepository = new RoleRepository();
    this.userRepository = new UserRepository();
  }

  public async getAllRoles(): Promise<Role[]> {
    const roles = await this.roleRepository.getAllRoles();
    return roles;
  }

  public async getRole(id: number): Promise<Role> {
    const role = await this.roleRepository.getRoleById(id);

    if (!role) {
      throw ErrorFactory.createNotFoundError("Role not found");
    }
    return role;
  }
  public async addRole(data: AddRoleRequest): Promise<number> {
    validateAddRole(data);

    const users: User[] = await Promise.all(
      data.users.map((id) => this.userRepository.getUserById(id)),
    );

    const addedRole: Role = {
      name: data.name,
      description: data.description,
      users: users,
    };

    const savedRole = await this.roleRepository.addRole(addedRole);
    if (savedRole.id) {
      return savedRole.id;
    } else {
      throw ErrorFactory.createInternalServerError(
        "Error occured. Try again later",
      );
    }
  }

  public async updateRole(data: UpdateRoleRequest): Promise<boolean> {
    validateUpdateRole(data);
    const role = await this.getRole(data.id);
    if ((role && !role.id) || !role) {
      throw ErrorFactory.createNotFoundError(
        `Role for given ID: ${data.id} not found`,
      );
    }

    const users: User[] = await Promise.all(
      data.users.map((id) => this.userRepository.getUserById(id)),
    );

    const updatedRole: Role = {
      name: data.name,
      description: data.description,
      users: users,
    };

    const updateResult = await this.roleRepository.updateRole(updatedRole);
    return updateResult;
  }

  public async deleteRole(id: number): Promise<boolean> {
    const role = await this.getRole(id);
    if ((role && !role.id) || !role) {
      throw ErrorFactory.createNotFoundError(
        `Role for given ID: ${id} not found`,
      );
    }
    const deleteResult = await this.roleRepository.deleteRole(id);
    if (!deleteResult) {
      throw ErrorFactory.createInternalServerError(
        "Internal server error, try again later.",
      );
    }
    return deleteResult;
  }
}
