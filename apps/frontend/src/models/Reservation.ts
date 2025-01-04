import { SaunaDto } from "./Sauna";
export interface ReservationResponse {
  id: number;
  user: UserReservationResponse;
  dateFrom: Date;
  dateTo: Date;
  numberOfPeople: number;
  sauna: SaunaDto;
}

export interface ReservationsResponse {
  reservations: ReservationResponse[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
export interface UserReservationResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
}
export interface ReservationRequestUpdate {
  id: number;
  dateFrom: Date ;
  dateTo: Date;
  numberOfPeople: number;
  saunaId: number;
  userId: number;
}
export interface ReservationRequestAdd{

  dateFrom: Date ;
  dateTo: Date;
  numberOfPeople: number;
  saunaId: number;
  userId: number;
}
