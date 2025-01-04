import React from "react";
import api from "./../../api/api";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { ReservationResponse } from "../../models/Reservation";
const DeleteReservation = ({
	reservationId , onClose, setReservations
}: {
	reservationId: number;
	  onClose: ()=>void;
	  setReservations: ()=>void;
}) => {

	const handleClick = async () => {
		if (reservationId) {
			try {
				await api.delete(`/reservation/${reservationId}`);
        onClose();
        setReservations();
			} catch (error: any) {
				console.error(`Error deleting reservation: ${error.message}`);
			}
		}
	};

	return (
		<>
			<h2>Delete Reservation for ID: {reservationId}</h2>
			<p>Are you sure?</p>
			<button onClick={handleClick}>
				DELETE reservation ID: {reservationId}
			</button>
			<button onClick={onClose}>Close</button>
		</>
	);
};

export default DeleteReservation;
