import { ReservationResponse } from "./reservation.response.dto";
import { RoleResponse } from "./role.response.dto";

export class UserResponse{
  name!: string;
  surnme!:string;
  email!: string;
  role!: RoleResponse;
  reservations!: ReservationResponse[];

}
