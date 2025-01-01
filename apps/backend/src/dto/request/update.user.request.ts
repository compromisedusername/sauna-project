
import { Reservation } from "../../entities/reservation.model";
import { Role } from "../../entities/role.model";

export class UpdateUserRequest {
  userId!: number;
  name!: string;
  surname!: string;
  email!: string;
  passwordHash!: string;
  role!: number;
  reservations!: number[];
}
