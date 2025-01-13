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
      <div className='title'>

         {//@ts-ignore
               t('reservationdetails')}
      </div>
    <table className ="table">
      <thead className='table-header'>
        <th className="table-header-cell">ID</th>
          <th className="table-header-cell">

         {//@ts-ignore
               t('seatsreserved')}
          </th>
        <th className="table-header-cell">

         {//@ts-ignore
               t('from')}
          </th>
        <th className="table-header-cell">

         {//@ts-ignore
               t('to')}
          </th>
        <th className="table-header-cell">

         {//@ts-ignore
               t('user')}{" "}
            ID</th>
        <th className="table-header-cell">

         {//@ts-ignore
               t('username')}
          </th>
        <th className="table-header-cell">

         {//@ts-ignore
               t('usersurname')}
          </th>
        <th className="table-header-cell">

         {//@ts-ignore
               t('useremail')}{" "}
          </th>
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
      <button onClick={onClose}>

         {//@ts-ignore
               t('close')}{" "}
        </button>
    </table>
    </div>
  );
};
export default ReservationDetails;
