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
        <div className="container">
            <h2 className="title">Saunas</h2>
            <div className="actions">
                <button
                    className="back-button"
                    onClick={() => {
                        navigate("/admin/");
                    }}
                >
                    Go back
                </button>
                <button
                    className="add-button"
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
                <table className="table">
                    <thead className="table-header">
                    <tr className="table-header-row">
                        <th className="table-header-cell">Name</th>
                        <th className="table-header-cell">Type</th>
                        <th className="table-header-cell">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {saunas.map((sauna) => (
                        <tr key={sauna.id} className="table-row">
                            <td className="table-cell">{sauna.name}</td>
                            <td className="table-cell">{sauna.saunaType}</td>
                            <td className="table-cell">
                                <button className="action-button" onClick={() => setSelectedSauna(sauna)}>Details</button>
                                <button className="action-button"
                                    onClick={() => {
                                        setDeletedSaunaId(sauna.id);
                                        setSelectedSauna(null);
                                    }}
                                >
                                    Delete
                                </button>
                                <button className="action-button"
                                    onClick={() => {
                                        navigate(`/admin/sauna/${sauna.id}/edit`);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
