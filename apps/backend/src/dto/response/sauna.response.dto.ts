import { ReservationResponse } from "./reservation.response.dto";

export class SaunaResponse{
  saunaType!: string;
  humidity!: number;
  temperature!: number;
  peopleCapacity!:number;
  reservations!: ReservationResponse[]
}
