
import { AddRoleRequest } from "../../../dto/request/add.role.request";
import { AddSaunaRequest } from "../../../dto/request/add.sauna.request";
import { UpdateRoleRequest } from "../../../dto/request/update.role.request";
import { UpdateSaunaRequest } from "../../../dto/request/update.sauna.request";
import { ErrorFactory } from "../../../errors/error-factory.error";


export function validateAddRole(data : AddRoleRequest):void{

}


export function validateUpdateRole(data: UpdateRoleRequest):void{
    validateAddRole(data);
}
