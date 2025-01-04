import { ReservationResponse } from "../../models/Reservation";
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
export default ReservationDetails;
