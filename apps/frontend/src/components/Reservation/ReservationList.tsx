import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { ReservationResponse } from "../../models/Reservation";
import { useNavigate } from "react-router-dom";
const ReservationsList: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationResponse | null>(null);
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
                  navigate(`/admin/reservation/${reservation.id}/delete`);
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
      >Add Sauna</button>
      {selectedReservation && (
        <ReservationDetails
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
};

interface ReservationDetailsProps {
  reservation: ReservationResponse;
  onClose: () => void;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({
  reservation,
  onClose,
}) => {
  return (
    <div>
      <h3>Reservation Details</h3>
      <p>Reservation ID: {reservation?.id}</p>
      <p>Starts at: {reservation.dateFrom?.toString()}</p>
      <p>Ends at: {reservation.dateTo?.toString()}</p>
      <p>User ID: {reservation.user?.id}</p>
      <p>User name: {reservation.user?.name}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ReservationsList;
