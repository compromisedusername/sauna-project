import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { SaunaResponseGuests } from "../../models/Sauna";
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
    <div className="container">
      <div>
        <button className="action-button" onClick={() => navigate("/")}>
          Get back
        </button>
      </div>
      <h2>Saunas in our offer:</h2>
      {saunas.length === 0 ? (
        <p>No saunas found.</p>
      ) : (
        <table className="sauna-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">Name</th>
              <th className="table-header">Type</th>
              <th className="table-header">Humidity</th>
              <th className="table-header">Temperature</th>
              <th className="table-header">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {saunas.map((sauna, index) => (
              <tr
                key={sauna.name + sauna.humidity}
                className={`table-row ${index % 2 === 0 ? "even-row" : "odd-row"}`}
              >
                <td className="table-cell">{sauna.name}</td>
                <td className="table-cell">{sauna.saunaType}</td>
                <td className="table-cell">{sauna.humidity}</td>
                <td className="table-cell">{sauna.temperature}</td>
                <td className="table-cell">{sauna.peopleCapacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SaunasGuestsList;
