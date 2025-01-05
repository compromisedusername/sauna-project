import { SaunaResponse } from "./sauna.response.dto";
import { UserResponse } from "./user.response.dto";
import { Sauna } from "../../entities/sauna.model";

export class ReservationResponse{
  dateFrom?: Date;
  dateTo?: Date;
  numberOfPeople?: number;
  sauna?: SaunaResponse;
  user?: UserResponse;
}

export interface ReservationDto {
  id?: number;
  dateFrom?: Date;
  dateTo?: Date;
  numberOfPeople?: number;
  sauna?: Sauna;
  user?: UserDto;
}

export interface UserDto {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
}

