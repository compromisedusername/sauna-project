import React, { useState, useEffect } from "react";
import api from "../../api/api";
import SaunaDetails from "./SaunaDetails";
import { SaunaDto, SaunaResponseGuests } from "../../models/Sauna";
import { useNavigate } from "react-router-dom";
const SaunasGuestsList: React.FC = () => {
  const [saunas, setSaunas] = useState<SaunaResponseGuests[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaunas = async () => {
      try {
        const response = await api.get<SaunaResponseGuests[]>("/saunasguests");
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
      <button onClick={() => navigate("/")}>Get back</button>
      <h2>Saunas in our offer:</h2>
      {saunas.length === 0 ? (
        <p>No saunas found.</p>
      ) : (
        <ul>
          {saunas.map((sauna) => (
            <li key={sauna.name + sauna.humidity}>
              Sauna Name: {sauna.name}
                Type: {sauna.saunaType}
                Humidity: {sauna.humidity}
                Temperature: {sauna.temperature}
                Capacity: {sauna.peopleCapacity}
            </li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default SaunasGuestsList;
