import { SaunaDto } from "../../models/Sauna";
import { useState } from "react";
interface SaunaDetailsProps {
  sauna: SaunaDto;
  onClose: () => void;
}

const SaunaDetails: React.FC<SaunaDetailsProps> = ({ sauna, onClose }) => {
const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPagesize] = useState<number>(5);
  const totalReservations = sauna.reservations?.length || 0;
  const totalPages = Math.ceil(totalReservations / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const reservationsOnPage =
    sauna.reservations?.slice(startIndex, endIndex) || [];

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagesize(Number(e.target.value));
  };
  return (
    <div>
      <h3>Sauna Details</h3>
      <p>Sauna ID: {sauna.id}</p>
      <p>Name: {sauna.name}</p>
      <p>Type: {sauna.saunaType}</p>
      <p>Humidity: {sauna.humidity}%</p>
      <p>Temperature: {sauna.temperature}°C</p>
      <p>Capacity: {sauna.peopleCapacity} people</p>
      <h4>Reservations:</h4>
      {sauna.reservations.length > 0 ? (
      <>
        <ul>
          {reservationsOnPage.map(reservation => (
            <li key={reservation.id}>
              Reservation ID: {reservation.id}, From: {new Date(reservation.dateFrom).toLocaleString()}, To: {new Date(reservation.dateTo).toLocaleString()}, People: {reservation.numberOfPeople}
            </li>
          ))}
        </ul><div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous Reservations
            </button>
            <span>
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next Reservations
            </button>
            Page Size:
            <select
              style={{ width: "60px" }}
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          </>
      ) : (
        <p>No reservations found for this sauna.</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
export default SaunaDetails;
