import { RoleResponse } from "./role.response.dto";

export class UserResponse{
  name?: string;
  surname?:string;
  email?: string;
  role?: RoleResponse;

}

export class UserNoReservations{
  id?: number;
  name?: string;
  surname?:string;
  email?: string;
  role?: RoleResponse;
}


