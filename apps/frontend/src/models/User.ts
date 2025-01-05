
 import { ReservationResponse } from "./Reservation";
 interface Reservation {
  id: number;
  dateFrom: string;
  dateTo: string;
  numberOfPeople: number;
}

 interface Role {
  id: number;
  description: string;
  name: string;
}

export interface UserDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
  reservations: Reservation[];
  role: Role;
}

export type UsersDto = UserDto[];

export interface UserRequestUpdate{
   id: number;
    name: string,
  surname: string,
  email: string,
  passwordHash: string,
  roleId: number,
  reservations: number[];
 }

export interface UserRequestAdd{
    name: string,
  surname: string,
  email: string,
  passwordHash: string,
  roleId: number,
  reservations: number[];
 }

 export type ReservationWithoutUser = ReservationResponse;
