import React, { useState, useEffect } from "react";
import {useTranslation}from 'react-i18next'
import { useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import api from "../../api/api";
import { RoleRequestAdd, UserRoleResponse } from "../../models/Role";
import { UserDto } from "../../models/User";
import validateRole from "./validateRole";

interface AddRoleProps { }

const AddRole: React.FC<AddRoleProps> = () => {
const {t} = useTranslation<'pl'|'en'>();
    const [role, setRole] = useState<RoleRequestAdd>({
        name: "",
        description: "",
        users: [],
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserRoleResponse[]>([]);
    const [selectedUserOptions, setSelecetdUserOptions] = useState<MultiValue<{
        value: number;
        label: string;
    }> | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get<UserDto[]>("/users");

                const users: UserRoleResponse[] = response.data.map((user) => {
                    return {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        role: user.role.name,
                    };
                });

                setUsers(users);
            } catch (error: any) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

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
                const response = await api.post(`/role`, role);
                navigate("/admin/roles");
            } catch (error: any) {
                setError(`Error adding role: ${error.message}`);
            }
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setRole((prevRole) => ({
            ...prevRole,
            [name]: value,
        }));
    };

    const handleUserSelectChange = (
        options: MultiValue<{ value: number; label: string }>,
    ) => {
        setSelecetdUserOptions(options);
        setRole((prevRole) => {
            if (!options) {
                return { ...prevRole!, users: [] };
            }
            return {
                ...prevRole,
                users: options.map((option) => option.value),
            };
        });
    };

    const usersOptions = users.map((user) => ({
        value: user.id,
        label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email}), Role: (${user.role})`,
    }));

    if (error) return <p>Error loading role details: {error}</p>;

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
            <h2 className="title">Add Role</h2>
            <form onSubmit={handleSubmit} className="add-form">
                <div className="add-form-group">
                    <label htmlFor="name" className="form-label">
                         {//@ts-ignore
               t('name')}
                        :
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={role.name}
                        onChange={handleInputChange}
                        className="input"
                    />
                </div>
                <div className="add-form">
                    <label htmlFor="description" className="form-label">
                         {//@ts-ignore
               t('desc')}
                        :
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={role.description}
                        onChange={handleInputChange}
                        className="input"
                    />
                </div>
                <div className="add-form">
                    <label htmlFor="users" className="form-label">
                         {//@ts-ignore
               t('user')}:
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
               t('add')}
                </button>
            </form>
        </div>
    );
};

export default AddRole;
