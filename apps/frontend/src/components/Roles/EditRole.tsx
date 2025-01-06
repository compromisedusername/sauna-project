import Select, { MultiValue } from "react-select";
import {useTranslation}from 'react-i18next'
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { RoleRequestUpdate, RoleDto } from "../../models/Role";
import { UserReservationResponse } from "../../models/Reservation";
import validateRole from "./validateRole";

interface EditRoleProps { }

const EditRole: React.FC<EditRoleProps> = () => {
const {t} = useTranslation<'pl'|'en'>();
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
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
        setValidationErrors([]);
        if (role) {
            const errors = validateRole(role);
            if (errors.length > 0) {
                setValidationErrors(errors);
                return;
            }
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
                users: options.map((option) => option.value),
            };
        });
    };
    const usersOptions = users.map((user) => ({
        value: user.id,
        label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email})`,
    }));

    return (
        <div className="container">
            <button
                className="back-button"
                onClick={() => {
                    navigate("/admin/roles");
                }}
            >
                 {//@ts-ignore
               t('goback')}
            </button>
            {validationErrors.length > 0 && (
                <ul className="validation-errors">
                    {validationErrors.map((error, index) => (
                        <li key={index} className="validation-error">
                            {error}
                        </li>
                    ))}
                </ul>
            )}
            <h2 className="title">
 {//@ts-ignore
               t('editrole')}

            </h2>
            <form onSubmit={handleSubmit} className="add-form">
                <p> {//@ts-ignore
               t('role')} ID: {role?.id}</p>
                <div className="add-form-group">
                    <label htmlFor="name" className="form-label">

                        : {//@ts-ignore
               t('name')}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={role?.name}
                        onChange={handleInputChange}
                        className="input"
                    />
                </div>
                <div className="add-form">
                    <label htmlFor="description" className="form-label">
                         {//@ts-ignore
               t('desc')}:
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={role?.description}
                        onChange={handleInputChange}
                        className="input"
                    />
                </div>
                <div className="add-form">
                    <label htmlFor="users" className="form-label">
                        User:
                    </label>
                    <Select
                        isMulti
                        options={usersOptions}
                        value={selectedUserOptions}
                        onChange={handleUserSelectChange}
                        placeholder="Select user..."
                        isSearchable
                        className="select"
                    />
                </div>

                <button type="submit" className="submit-button">
                     {//@ts-ignore
               t('save')}
                </button>
            </form>
        </div>
    );
};

export default EditRole;
