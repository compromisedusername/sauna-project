import { UserResponse } from "./user.response.dto";

export class RoleResponse{
  description?: string;
  name?:string;
  users?: UserResponse[];
}
