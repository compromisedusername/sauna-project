import { Reservation } from "../../entities/reservation.model";
import { Role } from "../../entities/role.model";

export class AddUserRequest {
  name?: string;
  surname?: string;
  email?: string;
  passwordHash?: string;
  role!: number;
  reservations!: number[];
}
