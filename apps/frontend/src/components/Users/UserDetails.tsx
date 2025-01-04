import { UserDto } from "../../models/User";

interface UserDetailsProps {
  user: UserDto;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  return (
    <div>
      <h3>User Details</h3>
      <p>User ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      <p>Email: {user.email}</p>
      <h4>Reservations:</h4>
      {user.reservations.length > 0 ? (
        <ul>
          {user.reservations.map((reservation) => (
            <li key={reservation.id}>
              Reservation ID: {reservation.id}, From:{" "}
              {new Date(reservation.dateFrom).toLocaleString()}, To:{" "}
              {new Date(reservation.dateTo).toLocaleString()}, People:{" "}
              {reservation.numberOfPeople}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found for this user.</p>
      )}
      <h4>Role:</h4>
      <p>Role ID: {user.role.id}</p>
      <p>Name: {user.role.name}</p>
      <p>Description: {user.role.description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
export default UserDetails;
