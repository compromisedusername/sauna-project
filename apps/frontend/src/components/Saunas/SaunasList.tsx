import React, { useState, useEffect } from 'react';
import api from '../../api/api';

// Interfaces for Sauna data
interface SaunaDto {
  id: number;
  name: string;
  saunaType: string;
  humidity: number;
  temperature: number;
  peopleCapacity: number;
  reservations: ReservationForSaunaDto[];
}

interface ReservationForSaunaDto {
  id: number;
  dateFrom: string;
  dateTo: string;
  numberOfPeople: number;
}

const SaunasList: React.FC = () => {
  const [saunas, setSaunas] = useState<SaunaDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSauna, setSelectedSauna] = useState<SaunaDto | null>(null);

  useEffect(() => {
    const fetchSaunas = async () => {
      try {
        const response = await api.get<SaunaDto[]>('/saunas');
        setSaunas(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSaunas();
  }, []);

  if (loading) return <p>Loading saunas...</p>;
  if (error) return <p>Error fetching saunas: {error}</p>;

  return (
    <div>
      <h2>Saunas</h2>
      {saunas.length === 0 ? (
        <p>No saunas found.</p>
      ) : (
        <ul>
          {saunas.map(sauna => (
            <li key={sauna.id}>
              Sauna Name: {sauna.name} ({sauna.saunaType})
              <button onClick={() => setSelectedSauna(sauna)}>Details</button>
            </li>
          ))}
        </ul>
      )}

      {selectedSauna && (
        <SaunaDetails sauna={selectedSauna} onClose={() => setSelectedSauna(null)} />
      )}
    </div>
  );
}

interface SaunaDetailsProps {
  sauna: SaunaDto;
  onClose: () => void;
}

const SaunaDetails: React.FC<SaunaDetailsProps> = ({ sauna, onClose }) => {
  return (
    <div>
      <h3>Sauna Details</h3>
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

export default SaunasList;
