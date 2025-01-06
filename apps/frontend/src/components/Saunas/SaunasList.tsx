import React, { useState, useEffect } from "react";
import api from "../../api/api";
import SaunaDetails from "./SaunaDetails";
import { SaunaDto } from "../../models/Sauna";
import { useNavigate } from "react-router-dom";
import DeleteSauna from "./DeleteSauna";
const SaunasList: React.FC = () => {
  const [saunas, setSaunas] = useState<SaunaDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSauna, setSelectedSauna] = useState<SaunaDto | null>(null);
  const navigate = useNavigate();
  const [deletedSaunaId, setDeletedSaunaId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSaunas = async () => {
      try {
        const response = await api.get<SaunaDto[]>("/saunas");
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

  const handleDeleteSauna = (deletedSaunaId: number) => {
    setSaunas((prevSaunas) =>
      prevSaunas.filter((sauna) => deletedSaunaId !== sauna.id),
    );
  };

  return (
    <div>
      <h2>Saunas</h2>{" "}
      <div>
        <button
          onClick={() => {
            navigate("/admin/");
          }}
        >
          Go back
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate(`/admin/sauna/add`);
          }}
        >
          Add New Sauna
        </button>
      </div>
      {saunas.length === 0 ? (
        <p>No saunas found.</p>
      ) : (
        <ul>
          {saunas.map((sauna) => (
            <li key={sauna.id}>
              Sauna Name: {sauna.name} ({sauna.saunaType})
              <button onClick={() => setSelectedSauna(sauna)}>Details</button>
              <button
                onClick={() => {
                  setDeletedSaunaId(sauna.id);
                  setSelectedSauna(null);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/sauna/${sauna.id}/edit`);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
      {deletedSaunaId && (
        <DeleteSauna
          saunaId={deletedSaunaId}
          onClose={() => setDeletedSaunaId(null)}
          setSaunas={() => handleDeleteSauna(deletedSaunaId)}
        />
      )}
      {selectedSauna && (
        <SaunaDetails
          sauna={selectedSauna}
          onClose={() => setSelectedSauna(null)}
        />
      )}
    </div>
  );
};

export default SaunasList;
