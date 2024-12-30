import { SaunaResponse } from "./sauna.response.dto";
import { UserResponse } from "./user.response.dto";

export class ReservationResponse{
  dateFrom?: Date;
  dateTo?: Date;
  numberOfPeople?: number;
  sauna?: SaunaResponse;
  user?: UserResponse;
}
