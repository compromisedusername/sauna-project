import Select, { MultiValue } from "react-select";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { RoleRequestUpdate, RoleDto } from "../../models/Role";
import { UserReservationResponse } from "../../models/Reservation";
interface EditRoleProps { }

const EditRole: React.FC<EditRoleProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [users, setUsers] = useState<UserReservationResponse[]>([]);
    const [role, setRole] = useState<RoleRequestUpdate | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [selectedUserOptions, setSelecetdUserOptions] = useState<MultiValue<{
        value: number;
        label: string;
    }> | null>(null);
    useEffect(() => {
        const fetchRole = async () => {
            if (id) {
                setLoading(true);
                try {
                    const response = await api.get<RoleDto>(`/role/${id}`);
                    setRole({
                        id: response.data.id,
                        name: response.data.name,
                        description: response.data.description,
                        users: response.data.users.map((u) => u.id),
                    });
                    setUsers(response.data.users);
                    setSelecetdUserOptions(
                        response.data.users.map((user) => ({
                            value: user.id,
                            label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email})`,
                        })),
                    );
                } catch (error: any) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchRole();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (role) {
            try {
                console.log(role);
                const response = await api.put(`/role`, role);
                navigate("/admin/roles");
            } catch (error: any) {
                setError(`Error updating role: ${error.message}`);
            }
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setRole((prevRole) => ({
            ...prevRole!,
            [name]: value,
        }));
    };

    if (loading) return <p>Loading role details...</p>;
    if (error) return <p>Error loading role details: {error}</p>;
    if (!role) return <p>Role not found.</p>;

    const handleUserSelectChange = (
        options: MultiValue<{ value: number; label: string }>,
    ) => {
        setSelecetdUserOptions(options);
        setRole((prevRole) => {
            if (!options) {
                return { ...prevRole!, users: [] };
            }
            return {
                ...prevRole!,
                users: options?.map((option) => option.value),
            };
        });
    };
    const usersOptions = users.map((user) => ({
        value: user.id,
        label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email})`,
    }));
    return (
        <div>
            <h2>Edit Role</h2>
				<button
					onClick={() => {
						navigate("/admin/roles");
					}}
				>
					Go back
				</button>
            <form onSubmit={handleSubmit}>
                <p>Role ID: {role.id}</p>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={role.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={role.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    User:
                    <Select
                        isMulti
                        options={usersOptions}
                        value={selectedUserOptions}
                        onChange={handleUserSelectChange}
                        placeholder="Select user..."
                        isSearchable
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditRole;
