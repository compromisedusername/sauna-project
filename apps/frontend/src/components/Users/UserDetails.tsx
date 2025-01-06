import { UserDto } from "../../models/User";
import { useState } from "react";

interface UserDetailsProps {
  user: UserDto;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPagesize] = useState<number>(5);
  const totalReservations = user.reservations?.length || 0;
  const totalPages = Math.ceil(totalReservations / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const reservationsOnPage =
    user.reservations?.slice(startIndex, endIndex) || [];

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
      <h3 className="title">User Details</h3>

      <table className="table">
        <thead className="table-header">
          <tr className="table-header-row">
            <th className="table-header-cell">User ID</th>
            <th className="table-header-cell">Name</th>
            <th className="table-header-cell">Surname</th>
            <th className="table-header-cell">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">{user.id}</td>
            <td className="table-cell">{user.name}</td>
            <td className="table-cell">{user.surname}</td>
            <td className="table-cell">{user.email}</td>
          </tr>
        </tbody>
      </table>

      <h4 className="title">Role:</h4>
      <table className="table">
        <thead className="table-header">
          <tr className="table-header-row">
            <th className="table-header-cell">ID</th>
            <th className="table-header-cell">Name</th>
            <th className="table-header-cell">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">{user.role.id}</td>
            <td className="table-cell">{user.role.name}</td>
            <td className="table-cell">{user.role.description}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="title">Reservations:</h4>
      {user.reservations?.length > 0 ? (
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
              {reservationsOnPage.map((reservation) => (
                <tr key={reservation.id} className="table-row">
                  <td className="table-cell">{reservation.id}</td>
                  <td className="table-cell">
                    {new Date(reservation.dateFrom).toLocaleString()}
                  </td>
                  <td className="table-cell">
                    {new Date(reservation.dateTo).toLocaleString()}
                  </td>
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
            <span className="sauna-details-page-info">
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
            <select
              className="select"
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
        <p className="no-data">No reservations found for this user.</p>
      )}

      <button className="back-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};
export default UserDetails;
