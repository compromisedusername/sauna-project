import React, { useState, useEffect } from "react";
import {useTranslation}from 'react-i18next'
import api from "../../api/api";
import {
  ReservationResponse,
  ReservationsResponse,
} from "../../models/Reservation";
import { useNavigate } from "react-router-dom";
import DeleteReservation from "./DeleteReservation";
import ReservationDetails from "./ReservationDetials";
const UserReservationsList = ({ userId }: { userId: number }) => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
          `/user/${userId}/reservations/${currentPage}/${pageSize}`,
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
  }, [currentPage, pageSize, userId]);

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p>Error fetching reservations: {error}</p>;

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
    <div className="container">
      <h2 className="title">Reservations</h2>
      <div className="actions">
        <button
          className="back-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back
        </button>
        <button
          className="add-button"
          onClick={() => {
            navigate(`/user/reservation/add`);
          }}
        >
          Add new reservation
        </button>
        <div></div>
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
              <th className="table-header-cell">Seats Reserved</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="table-row">
                <td className="table-cell">{reservation.id}</td>
                <td className="table-cell">
                  {new Date(reservation.dateFrom).toISOString().slice(0, 16)}
                </td>
                <td className="table-cell">
                  {new Date(reservation.dateTo).toISOString().slice(0, 16)}
                </td>
                <td className="table-cell">{reservation.numberOfPeople}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default UserReservationsList;
