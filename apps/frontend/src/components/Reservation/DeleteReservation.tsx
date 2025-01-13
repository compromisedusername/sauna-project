import React from "react";
import {useTranslation}from 'react-i18next'
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

const {t} = useTranslation<'pl'|'en'>();
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
			<h2 className= 'title'>

            {//@ts-ignore
               t('deletereservation')}:
				ID: {reservationId}</h2>
			<p className='title-sure'>

            {//@ts-ignore
               t('sure')}:
			</p>
			<button className='back-button' onClick={handleClick}>

            {//@ts-ignore
               t('yesdeletereservation')}:

				ID: {reservationId}
			</button>
			<button className='delete-button' onClick={onClose}>

            {//@ts-ignore
               t('close')}:
			</button>
		</div>
	);
};

export default DeleteReservation;
