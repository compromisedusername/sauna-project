import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { ReservationResponse } from "../../models/Reservation";
import { useNavigate } from "react-router-dom";
import DeleteReservation from "./DeleteReservation";
import ReservationDetails from "./ReservationDetials";
const ReservationsList: React.FC = () => {
	const [reservations, setReservations] = useState<ReservationResponse[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedReservation, setSelectedReservation] =
		useState<ReservationResponse | null>(null);
	const [deletedReservationId, setDeletedReservationId] = useState<
		number | null
	>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				const response = await api.get<ReservationResponse[]>("/reservations");
				setReservations(response.data);
				console.log(response.data);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchReservations();
	}, []);

	if (loading) return <p>Loading reservations...</p>;
	if (error) return <p>Error fetching reservations: {error}</p>;

	const handleDeleteReservation = (deletedReservationId: number) => {
		setReservations((prevReservations) =>
			prevReservations.filter(
				(reservation) => deletedReservationId !== reservation.id,
			)
		);
	};

	return (
		<div>
			<h2>Reservations</h2>
			{reservations.length === 0 ? (
				<p>No reservations found.</p>
			) : (
				<ul>
					{reservations.map((reservation) => (
						<li key={reservation.id}>
							Reservation ID: {reservation.id}
							Reservation details:{" "}
							<button onClick={() => setSelectedReservation(reservation)}>
								Details
							</button>
							Delete:{" "}
							<button
								onClick={() => {
									setDeletedReservationId(reservation.id);
									setSelectedReservation(null);
								}}
							>
								Delete
							</button>
							Edit:{" "}
							<button
								onClick={() => {
									navigate(`/admin/reservation/${reservation.id}/edit`);
								}}
							>
								Edit
							</button>
						</li>
					))}
				</ul>
			)}
			<button
				onClick={() => {
					navigate(`/admin/reservation/add`);
				}}
			>
				Add new reservation
			</button>

			{deletedReservationId && (
				<DeleteReservation
					reservationId={deletedReservationId}
					onClose={() => setDeletedReservationId(null)}
					setReservations={ ()=>
					  handleDeleteReservation(deletedReservationId)
					}
				/>
			)}
			{selectedReservation && (
				<ReservationDetails
					reservation={selectedReservation}
					onClose={() => setSelectedReservation(null)}
				/>
			)}
		</div>
	);
};

export default ReservationsList;
