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
		<div className='container'>
			<h2 className= 'title'>Delete Reservation for ID: {reservationId}</h2>
			<p className='title-sure'>Are you sure?</p>
			<button className='back-button' onClick={handleClick}>
			YES, DELETE reservation ID: {reservationId}
			</button>
			<button className='delete-button' onClick={onClose}>NO, CLOSE</button>
		</div>
	);
};

export default DeleteReservation;
