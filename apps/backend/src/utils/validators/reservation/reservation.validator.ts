


import { AddReservationRequest } from "../../../dto/request/add.reservation.request";
import { UpdateReservationRequest } from "../../../dto/request/update.reservation.request";
import { ErrorFactory } from "../../../errors/error-factory.error";


export function validateNewReservation(data : AddReservationRequest | UpdateReservationRequest):void{

    if ( data.dateTo && data.dateFrom && (data.dateFrom >= data.dateTo)) {
      throw ErrorFactory.createBadRequestError(
        "Reservation end cant be before start!",
      );
    }
}


