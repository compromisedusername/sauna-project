import React, { useState, useEffect } from "react";
import api from "../../api/api";
import {
	ReservationResponse,
	ReservationsResponse,
} from "../../models/Reservation";
import { useNavigate } from "react-router-dom";
import DeleteReservation from "./DeleteReservation";
import ReservationDetails from "./ReservationDetials";
import {useTranslation}from 'react-i18next'
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
const {t} = useTranslation<'pl'|'en'>();

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
		setPageInput(String(currentPage+1))
	};
	const handlePrevPage = () => {
		setCurrentPage((prevpPage) => prevpPage - 1);
		setPageInput(String(currentPage-1))
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
		<div className="container">
			<h2 className="title">
 {//@ts-ignore
               t('reservations')}

			</h2>
			<div className="actions">
				<button
					className="back-button"
					onClick={() => {
						navigate("/admin/");
					}}
				>
					 {//@ts-ignore
               t('goback')}
				</button>
				<button
					className="add-button"
					onClick={() => {
						navigate(`/admin/reservation/add`);
					}}
				>
					 {//@ts-ignore
               t('add')}
				</button>
			</div>
			{reservations.length === 0 ? (
				<p>No reservations found.</p>
			) : (
				<table className="table">
					<thead className="table-header">
						<tr className="table-header-row">
							<th className="table-header-cell">ID</th>
							<th className="table-header-cell">Starts At</th>
							<th className="table-header-cell">Ends At</th>
							<th className="table-header-cell">Actions</th>
						</tr>
					</thead>
					<tbody>
						{reservations.map((reservation) => (
							<tr key={reservation.id} className="table-row">
								<td className="table-cell">{reservation.id}</td>
								<td className="table-cell">{new Date(reservation.dateFrom).toDateString()}
								</td>
								<td className="table-cell">{new Date(reservation.dateFrom).toDateString()}
									</td>
								<td className="table-cell">
									<button
										className="action-button"
										onClick={() => {
											if (selectedReservation?.id === reservation.id) {
												setSelectedReservation(null);
												return;
											}
											setSelectedReservation(reservation);
										}}
									>
										 {//@ts-ignore
               t('details')}
									</button>
									<button
										className="action-button"
										onClick={() => {
											setDeletedReservationId(reservation.id);
											setSelectedReservation(null);
										}}
									>
										 {//@ts-ignore
               t('delete')}
									</button>
									<button
										className="action-button"
										onClick={() => {
											navigate(`/admin/reservation/${reservation.id}/edit`);
										}}
									>
										 {//@ts-ignore
               t('edit')}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
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

			<div className="add-form">
				<button
					className="action-button"
					onClick={() => handlePrevPage()}
					disabled={currentPage === 1}
				>
					Previous Page
				</button>
				<span className="form-label">
					Page{" "}
					<input
						type="number"
						className="input"
						value={pageInput}
						onChange={handlePageInputChange}
						onBlur={handlePageInputBlurr}
						style={{ width: "50px" }}
					/>{" "}
					of {totalPages}
				</span>
				<button
					className="action-button"
					onClick={() => handleNextPage()}
					disabled={currentPage === totalPages}
				>
					Next Page
				</button>
				<span className="form-label">
					Page Size:
					<select
						className="select"
						value={pageSize}
						onChange={handlePageSizeChange}
						style={{ width: "60px" }}
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
					</select>
				</span>
				<></>
			</div>
		</div>
	);
};

export default ReservationsList;
