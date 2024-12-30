import { Reservation } from "../../entities/reservation.model";
import { Role } from "../../entities/role.model";

export class AddUserRequest {
  name!: string;
  surname!: string;
  email!: string;
  passwordHash!: string;
  salt!: string;
  role!: number;
  reservations!: number[];
}
