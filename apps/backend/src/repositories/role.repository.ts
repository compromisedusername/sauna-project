import { ErrorFactory } from "./../errors/error-factory.error";
import { Sauna } from "./../entities/sauna.model";
import { Repository } from "typeorm";
import AppDataSource from "./../config/ormconfig";
import { Role } from "../entities/role.model";
import { HttpError } from "../errors/http-error.error";
export class RoleRepository {
  protected readonly roleRepository: Repository<Role> =
    AppDataSource.getRepository(Role);

  public async getAllRoles(): Promise<Role[]> {
    try {
      const roles: Role[] = await this.roleRepository.find({
        relations: ["users"],
      });
      return roles;
    } catch (error) { throw ErrorFactory.createInternalServerError("Try again later", error)}
  }

  public async getRoleByName(roleName: string): Promise<Role> {
    try {
      const role: Role | null = await this.roleRepository.findOneBy({
        name: roleName,
      });
      if (role) {
        return role;
      } else {
        throw ErrorFactory.createNotFoundError(
          `Role name '${roleName} not found'`,
        );
      }
    } catch (error) {
      throw error;
    }
  }
  public async getRoleById(id: number): Promise<Role> {
    try {
      const role: Role | null = await this.roleRepository.findOne({
        where: { id: id },
        relations: ["users"],
      });
      if (role) return role;
      else
        throw ErrorFactory.createNotFoundError(`Role for ID: ${id} not found`);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      } else {
        throw ErrorFactory.createInternalServerError("Try again later.", error);
      }
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
      throw ErrorFactory.createInternalServerError("Update role failed", error);
    }
  }
public async getRolesWithoutUser(): Promise<Role[]>{
    try{
      const result = this.roleRepository.find();
      return result;
    }catch(error){
      throw ErrorFactory.createInternalServerError("Try again later", error)
    }
  }
  public async deleteRole(id: number): Promise<boolean> {
    try {
      const result = await this.roleRepository.delete(id);
      return result.affected !== 0 ? true : false;
    } catch (error) {
      throw ErrorFactory.createInternalServerError("Delete role failed", error);
    }
  }
}
