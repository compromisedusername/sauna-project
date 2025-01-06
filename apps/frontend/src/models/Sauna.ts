import { ReservationResponse } from "./Reservation";

export interface Sauna {
  id: number;
  name: string;
  saunaType: string;
  humidity: number;
  temperature: number;
  peopleCapacity: number;
}
export interface SaunaDto {
  id: number;
  name: string;
  saunaType: string;
  humidity: number;
  temperature: number;
  peopleCapacity: number;
  reservations: ReservationForSaunaDto[];
}
export interface ReservationForSaunaDto {
  id: number;
  dateFrom: string;
  dateTo: string;
  numberOfPeople: number;
}
export interface SaunaRequestUpdate{
  id: number;
    name: string,
  saunaType: string,
  temperature: number,
  peopleCapacity: number;
  humidity: number,
  reservations: number[];
}export interface SaunaRequestAdd{

    name: string,
  saunaType: string,
  temperature: number,
  peopleCapacity: number;
  humidity: number,
  reservations: number[];
}
export interface SaunaResponse{
    id: number,
  name: string,
  saunaType: string,
  humidity: number,
  temperature: number,
  peopleCapacity: number,
  reservations: ReservationResponse[]
}
export interface SaunaResponseGuests{
  name: string,
  saunaType: string,
  humidity: number,
  temperature: number,
  peopleCapacity: number,
}
