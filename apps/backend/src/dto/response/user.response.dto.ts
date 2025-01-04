import { RoleResponse } from "./role.response.dto";

export class UserResponse{
  name?: string;
  surname?:string;
  email?: string;
  role?: RoleResponse;

}
