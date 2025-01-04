import React, { useState, useEffect } from 'react';
import api from '../../api/api';

// Define the UserDto interface based on the provided data structure
interface UserDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
  reservations: ReservationForUserDto[];
  role: RoleForUserDto;
}

interface ReservationForUserDto {
  id: number;
  dateFrom: string;
  dateTo: string;
  numberOfPeople: number;
}

interface RoleForUserDto {
  id: number;
  description: string;
  name: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<UserDto[]>('/users');
        setUsers(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              User ID: {user.id}, Name: {user.name} {user.surname}
              <button onClick={() => setSelectedUser(user)}>Details</button>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

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
          {user.reservations.map(reservation => (
            <li key={reservation.id}>
              Reservation ID: {reservation.id}, From: {new Date(reservation.dateFrom).toLocaleString()}, To: {new Date(reservation.dateTo).toLocaleString()}, People: {reservation.numberOfPeople}
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

export default UsersList;
