export interface RoleDto {
  id: number;
  description: string;
  name: string;
  users: UserForRoleDto[];
}

export interface RoleRequestAdd {
    name: string;
    description: string;
  users: number[];
}

export interface RoleRequestUpdate {
    id: number;
    name: string;
    description: string;
  users: number[];
}

export interface UserForRoleDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
}
export interface UserRoleResponse{
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
}
