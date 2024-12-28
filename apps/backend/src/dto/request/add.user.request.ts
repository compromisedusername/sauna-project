import { Reservation } from "../../entities/reservation.model";
import { Role } from "../../entities/role.model";

export class AddUpdateUserRequest {
  name!: string;
  surname!: string;
  email!: string;
  passwordHash!: string;
  salt!: string;
  role!: Role;
  reservations!: Reservation[];
}
