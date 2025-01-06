import { ReservationResponse } from "./reservation.response.dto";

export class SaunaResponse{
  saunaType?: string;
  humidity?: number;
  temperature?: number;
  peopleCapacity?:number;
  reservations?: ReservationResponse[]
}
export class SaunaResponseGuests{
  saunaType?: string;
  humidity?: number;
  peopleCapacity?: number;
  temperature?: string;
  name?: string;

}
