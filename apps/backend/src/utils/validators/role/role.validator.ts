
import { AddRoleRequest } from "../../../dto/request/add.role.request";
import { AddSaunaRequest } from "../../../dto/request/add.sauna.request";
import { UpdateRoleRequest } from "../../../dto/request/update.role.request";
import { UpdateSaunaRequest } from "../../../dto/request/update.sauna.request";
import { ErrorFactory } from "../../../errors/error-factory.error";


export function validateNewRole(data : AddRoleRequest | AddRoleRequest):void{

      if( data.name && data.name.length > 20){
      throw ErrorFactory.createBadRequestError("Role name cant exceed 20 chars")
    }
      if(data.description && data.description.length > 20){
      throw ErrorFactory.createBadRequestError("Role description cant exceed 20 chars")
    }
}

