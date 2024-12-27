import { UserResponse } from "./user.response.dto";

export class RoleResponse{
  desription!: string;
  name!:string;
  users!: UserResponse[];
}
