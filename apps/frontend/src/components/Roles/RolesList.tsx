import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { RoleDto, UserForRoleDto } from '../../models/Role';
import RoleDetails from "./RoleDetails";
import DeleteRole from "./DeleteRole";

const RolesList: React.FC = () => {
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);
    const [deletedRoleId, setDeletedRoleId] = useState<number | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get<RoleDto[]>('/roles?users=true');
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
            prevRoles.filter((role) => deletedRoleId !== role.id)
        );
    };

    return (
        <div>
            <h2>Roles</h2>
            <div>
                <button
                    onClick={() => {
                        navigate(`/admin/role/add`);
                    }}
                >
                    Add New Role
                </button>
                <div>
                    <button
                        onClick={() => {
                            navigate("/admin/");
                        }}
                    >
                        Go back
                    </button>
                </div>
            </div>
            {roles.length === 0 ? (
                <p>No roles found.</p>
            ) : (
                <ul>
                    {roles.map((role) => (
                        <li key={role.id}>
                            Role Name: {role.name} - {role.description}
                            <button onClick={() => setSelectedRole(role)}>Details</button>
                            <button
                                onClick={() => {
                                    setDeletedRoleId(role.id);
                                    setSelectedRole(null);
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/admin/role/${role.id}/edit`);
                                }}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {deletedRoleId && (
                <DeleteRole
                    roleId={deletedRoleId}
                    onClose={() => setDeletedRoleId(null)}
                    setRoles={() => handleDeleteRole(deletedRoleId)}
                />
            )}
            {selectedRole && (
                <RoleDetails role={selectedRole} onClose={() => setSelectedRole(null)} />
            )}
        </div>
    );
};

export default RolesList;
