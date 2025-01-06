import { ReservationResponse } from "../../models/Reservation";
import {useTranslation}from 'react-i18next'
 interface ReservationDetailsProps {
  reservation: ReservationResponse;
  onClose: () => void;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({
  reservation,
  onClose,
}) => {
const {t} = useTranslation<'pl'|'en'>();
  return (
    <div className='container'>
      <div className='title'>ReservationDetails</div>
    <table className ="table">
      <thead className='table-header'>
        <th className="table-header-cell">ID</th>
          <th className="table-header-cell">Seats Reserved</th>
        <th className="table-header-cell">Starts at</th>
        <th className="table-header-cell">Ends at</th>
        <th className="table-header-cell">User ID</th>
        <th className="table-header-cell">User Name</th>
        <th className="table-header-cell">User Surname</th>
        <th className="table-header-cell">User email</th>
      </thead>
      <tbody>
          <td className="table-cell">{reservation.id}</td>
          <td className="table-cell">{reservation.numberOfPeople}</td>
          <td className="table-cell">
{new Date(reservation.dateFrom).toLocaleString()}
          </td>
          <td className="table-cell">
{new Date(reservation.dateFrom).toLocaleString()}
          </td>
          <td className="table-cell">{reservation.user.id}</td>
          <td className="table-cell">{reservation.user?.name}</td>
          <td className="table-cell">{reservation.user?.surname}</td>
          <td className="table-cell">{reservation.user?.email}</td>


      </tbody>
      <button onClick={onClose}>Close</button>
    </table>
    </div>
  );
};
export default ReservationDetails;
