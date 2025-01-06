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
    <div className="container">
      <h3 className="title">Sauna Details</h3>
      <table className="table">
        <thead className="table-header">
          <tr className="table-header-row">
            <th className="table-header-cell">Sauna ID</th>
            <th className="table-header-cell">Name</th>
            <th className="table-header-cell">Type</th>
            <th className="table-header-cell">Humidity</th>
            <th className="table-header-cell">Temperature</th>
            <th className="table-header-cell">Capacity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">{sauna.id}</td>
            <td className="table-cell">{sauna.name}</td>
            <td className="table-cell">{sauna.saunaType}</td>
            <td className="table-cell">{sauna.humidity}%</td>
            <td className="table-cell">{sauna.temperature}°C</td>
            <td className="table-cell">{sauna.peopleCapacity} people</td>
          </tr>
        </tbody>
      </table>
      <h4 className="title">Reservations:</h4>
      {sauna.reservations?.length > 0 ? (
        <>
          <table className="table">
            <thead className="table-header">
              <tr className="table-header-row">
                <th className="table-header-cell">ID</th>
                <th className="table-header-cell">From</th>
                <th className="table-header-cell">To</th>
                <th className="table-header-cell">People</th>
              </tr>
            </thead>
            <tbody>
              {reservationsOnPage.map(reservation => (
                <tr key={reservation.id} className="table-row">
                  <td className="table-cell">{reservation.id}</td>
                  <td className="table-cell">{new Date(reservation.dateFrom).toLocaleString()}</td>
                  <td className="table-cell">{new Date(reservation.dateTo).toLocaleString()}</td>
                  <td className="table-cell">{reservation.numberOfPeople}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-form">
            <button
              className="action-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous Reservations
            </button>
            <span className="details-page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="action-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next Reservations
            </button>
            <span className="form-label">Page Size:</span>
            <select style={{width: "50px"}}
              className="select"
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
        <p className="no-data">No reservations found for this sauna.</p>
      )}
      <button className="back-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default SaunaDetails;
