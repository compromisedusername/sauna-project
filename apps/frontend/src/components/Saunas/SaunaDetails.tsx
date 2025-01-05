import { SaunaDto } from "../../models/Sauna";
interface SaunaDetailsProps {
  sauna: SaunaDto;
  onClose: () => void;
}

const SaunaDetails: React.FC<SaunaDetailsProps> = ({ sauna, onClose }) => {
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
        <ul>
          {sauna.reservations.map(reservation => (
            <li key={reservation.id}>
              Reservation ID: {reservation.id}, From: {new Date(reservation.dateFrom).toLocaleString()}, To: {new Date(reservation.dateTo).toLocaleString()}, People: {reservation.numberOfPeople}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found for this sauna.</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
export default SaunaDetails;
