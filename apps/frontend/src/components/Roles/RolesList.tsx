import React, { useState, useEffect } from "react";
import {useTranslation}from 'react-i18next'
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { RoleDto, UserForRoleDto } from "../../models/Role";
import RoleDetails from "./RoleDetails";
import DeleteRole from "./DeleteRole";

const RolesList: React.FC = () => {
const {t} = useTranslation<'pl'|'en'>();
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);
    const [deletedRoleId, setDeletedRoleId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get<RoleDto[]>("/roles?users=true");
                setRoles(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    if (loading) return <p>Loading roles...</p>;
    if (error) return <p>Error fetching roles: {error}</p>;

    const handleDeleteRole = (deletedRoleId: number) => {
        setRoles((prevRoles) =>
            prevRoles.filter((role) => deletedRoleId !== role.id),
        );
    };
return (
        <div className="container">
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
                        navigate(`/admin/role/add`);
                    }}
                >
                     {//@ts-ignore
               t('add')} {//@ts-ignore
               t('role')}
                </button>
            </div>
            <h2 className="title">Roles</h2>
            {roles.length === 0 ? (
                <p>No roles found.</p>
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
               t('desc')}
                                </th>
                            <th className="table-header-cell">
 {//@ts-ignore
               t('add')}

                                </th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id} className="table-row">
                                <td className="table-cell">{role.name}</td>
                                <td className="table-cell">{role.description}</td>
                                <td className="table-cell">
                                    <button className="action-button" onClick={() => setSelectedRole(role)}>
 {//@ts-ignore
               t('details')}
                                        </button>
                                    <button className="action-button"
                                        onClick={() => {
                                            setDeletedRoleId(role.id);
                                            setSelectedRole(null);
                                        }}
                                    >
                                         {//@ts-ignore
               t('delete')}

                                        </button>
                                    <button className="action-button"
                                        onClick={() => {
                                            navigate(`/admin/role/${role.id}/edit`);
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
            {deletedRoleId && (
                <DeleteRole
                    roleId={deletedRoleId}
                    onClose={() => setDeletedRoleId(null)}
                    setRoles={() => handleDeleteRole(deletedRoleId)}
                />
            )}
            {selectedRole && (
                <RoleDetails
                    role={selectedRole}
                    onClose={() => setSelectedRole(null)}
                />
            )}
        </div>
    );

};

export default RolesList;
