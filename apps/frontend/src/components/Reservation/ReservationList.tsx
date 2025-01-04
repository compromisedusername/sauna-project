import React, { useState, useEffect } from "react";
import api from "../../api/api";
import {
	ReservationResponse,
	ReservationsResponse,
} from "../../models/Reservation";
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
	const [pageSize, setPageSize] = useState<number>(5);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [pageInput, setPageInput] = useState<string>("1");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				const response = await api.get<ReservationsResponse>(
					`/reservations/${currentPage}/${pageSize}`,
				);
				setReservations(response.data.reservations);
				setTotalPages(response.data.totalPages);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchReservations();
	}, [currentPage, pageSize]);

	if (loading) return <p>Loading reservations...</p>;
	if (error) return <p>Error fetching reservations: {error}</p>;

	const handleDeleteReservation = (deletedReservationId: number) => {
		setReservations((prevReservations) =>
			prevReservations.filter(
				(reservation) => deletedReservationId !== reservation.id,
			),
		);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};
	const handlePrevPage = () => {
		setCurrentPage((prevpPage) => prevpPage - 1);
	};
	const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPageSize(Number(e.target.value));
	};
	const handlePageInputBlurr = () => {
		if (pageInput) {
			setCurrentPage(Number(pageInput));
		} else {
			setPageInput(String(currentPage));
		}
	};
	const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (Number(value) > 0 && Number(value) <= totalPages) {
			setPageInput(value);
		} else if (value === "") {
			setPageInput("");
		}
	};

	return (
		<div>
			<h2>Reservations</h2>

			<div>
				<button
					onClick={() => {
						navigate(`/admin/reservation/add`);
					}}
				>
					Add new reservation
				</button>
				<div>
				  <button
    onClick={()=>{
              navigate('/admin/')
            }}
				  >Go back</button>
				</div>
			</div>
			{reservations.length === 0 ? (
				<p>No reservations found.</p>
			) : (
				<ul>
					{reservations.map((reservation) => (
						<li key={reservation.id}>
							Reservation ID: {reservation.id}
							<button
								onClick={() => {
									if (selectedReservation?.id === reservation.id) {
										setSelectedReservation(null);
										return;
									}
									setSelectedReservation(reservation);
								}}
							>
								Details
							</button>
							<button
								onClick={() => {
									setDeletedReservationId(reservation.id);
									setSelectedReservation(null);
								}}
							>
								Delete
							</button>
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
			{deletedReservationId && (
				<DeleteReservation
					reservationId={deletedReservationId}
					onClose={() => setDeletedReservationId(null)}
					setReservations={() => handleDeleteReservation(deletedReservationId)}
				/>
			)}
			{selectedReservation && (
				<ReservationDetails
					reservation={selectedReservation}
					onClose={() => setSelectedReservation(null)}
				/>
			)}

			<div>
				<button onClick={() => handlePrevPage()} disabled={currentPage === 1}>
					Previous Page
				</button>
				<span>
					Page{" "}
					<input
						style={{ width: "50px" }}
						type="number"
						value={pageInput}
						onChange={handlePageInputChange}
						onBlur={handlePageInputBlurr}
					/>{" "}
					of {totalPages}
				</span>
				<button
					onClick={() => handleNextPage()}
					disabled={currentPage === totalPages}
				>
					Next Page
				</button>
				Page Size:
				<select
					style={{ width: "60px" }}
					value={pageSize}
					onChange={handlePageSizeChange}
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</select>
				<></>
			</div>
		</div>
	);
};

export default ReservationsList;
