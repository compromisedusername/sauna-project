import {
  ReservationRequestAdd,
  ReservationResponse,
} from "../../models/Reservation";
function validateReservation(
  dateFrom: Date,
  dateTo: Date,
  seatsReserved: number,
  saunaCapacity: number | undefined,
): string[] {
  const errors: string[] = [];

  if (saunaCapacity && seatsReserved > saunaCapacity) {
    errors.push("Number of people can not be higher than capacity of sauna");
  }
  if (
    new Date(dateFrom) >= new Date(dateTo)
  ) {
    errors.push("Date From can not be later than Date To");
  }

  return errors;
}
export default validateReservation;
