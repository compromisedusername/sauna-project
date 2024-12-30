
import { ErrorFactory } from "./../errors/error-factory.error";
import { Sauna } from "./../entities/sauna.model";
import { Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
import { Role } from "../entities/role.model";
export class RoleRepository {
  protected readonly roleRepository: Repository<Role> =
    AppDataSource.getRepository(Role);

  public async getAllRoles(): Promise<Role[]> {
    const roles: Role[] = await this.roleRepository.find();
    return roles;
  }

  public async getRoleById(id: number): Promise<Role> {
    try {
      const role: Sauna | null = await this.roleRepository.findOneBy({
        id: id,
      });
      if(role)
      return role;
      else
      throw ErrorFactory.createNotFoundError(`Role for ID: ${id} not found`)
    } catch (error) {
      throw ErrorFactory.createInternalServerError(
        `Finding role failed`,
        error,
      );
    }
  }

  public async addRole(addedRole: Role): Promise<Role> {
    try {
      const role = this.roleRepository.create(addedRole);
      const result = await this.roleRepository.save(role);
      return result;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Add role failed", error);
    }
  }

  public async updateRole(updatedRole: Role): Promise<boolean> {
    try {
      const result = this.roleRepository.merge(updatedRole);
      return result ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Update user failed", error);
    }
  }

  public async deleteRole(id: number): Promise<boolean> {
    try {
      const result = await this.roleRepository.delete(id);
      return result.affected !== 0 ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError(
        "Delete role failed",
        error,
      );
    }
  }
}
