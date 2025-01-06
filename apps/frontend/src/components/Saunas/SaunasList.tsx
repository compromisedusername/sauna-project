import React, { useState, useEffect } from "react";
import api from "../../api/api";
import SaunaDetails from "./SaunaDetails";
import { SaunaDto } from "../../models/Sauna";
import { useNavigate } from "react-router-dom";
import DeleteSauna from "./DeleteSauna";

import {useTranslation}from 'react-i18next'
const SaunasList: React.FC = () => {
  const [saunas, setSaunas] = useState<SaunaDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSauna, setSelectedSauna] = useState<SaunaDto | null>(null);
  const navigate = useNavigate();
  const [deletedSaunaId, setDeletedSaunaId] = useState<number | null>(null);

const {t} = useTranslation<'pl'|'en'>();
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
                     {//@ts-ignore
            t('goback')}
                </button>
                <button
                    className="add-button"
                    onClick={() => {
                        navigate(`/admin/sauna/add`);
                    }}
                >
                     {//@ts-ignore
            t('addsauna')}
                </button>
            </div>
            {saunas.length === 0 ? (
                <p>
 {//@ts-ignore
            t('nodata')}

                </p>
            ) : (
                <table className="table">
                    <thead className="table-header">
                    <tr className="table-header-row">
                        <th className="table-header-cell">
 {//@ts-ignore
            t('name')}
                                </th>
                        <th className="table-header-cell">
 {//@ts-ignore
            t('saunaType')}
                                </th>
                        <th className="table-header-cell">
 {//@ts-ignore
            t('actions')}

                                </th>
                    </tr>
                    </thead>
                    <tbody>
                    {saunas.map((sauna) => (
                        <tr key={sauna.id} className="table-row">
                            <td className="table-cell">{sauna.name}</td>
                            <td className="table-cell">{sauna.saunaType}</td>
                            <td className="table-cell">
                                <button className="action-button" onClick={() => setSelectedSauna(sauna)}>
 {//@ts-ignore
            t('details')}

                                        </button>
                                <button className="action-button"
                                    onClick={() => {
                                        setDeletedSaunaId(sauna.id);
                                        setSelectedSauna(null);
                                    }}
                                >
                                     {//@ts-ignore
            t('delete')}
                                </button>
                                <button className="action-button"
                                    onClick={() => {
                                        navigate(`/admin/sauna/${sauna.id}/edit`);
                                    }}
                                >
                                     {//@ts-ignore
            t('edit')}
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
