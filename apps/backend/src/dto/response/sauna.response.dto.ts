import { ReservationResponse } from "./reservation.response.dto";

export class SaunaResponse{
  sauna_type!: string;
  humidity!: number;
  temperature!: number;
  peopleCapacity!:number;
  reservations!: ReservationResponse[]
}
