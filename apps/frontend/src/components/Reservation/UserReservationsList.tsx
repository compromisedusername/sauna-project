import React, { useState, useEffect } from "react";
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
    <div>
      <h2>Reservations</h2>

      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Go back
        </button>
        <button
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
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <>
                Reservation ID: {reservation.id}
                Reservation Starts: {reservation.dateFrom}
                Reservation Ends: {reservation.dateTo}
                Seats reserved: {reservation.numberOfPeople}
              </>
            </li>
          ))}
        </ul>
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

export default UserReservationsList;
