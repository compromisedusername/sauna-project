import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { RoleRequestAdd, UserRoleResponse } from "../../models/Role";
import { useEffect } from "react";
import { UserReservationResponse } from "../../models/Reservation";
import { UserDto } from "../../models/User";
import {MultiValue } from 'react-select'
import Select from 'react-select';
interface AddRoleProps { }

const AddRole: React.FC<AddRoleProps> = () => {
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
                        role: user.role.name
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
        if (role) {
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
        options:MultiValue< { value: number; label: string }>
    ) => {
        setSelecetdUserOptions(options);
        setRole((prevRole) => {
            if(!options){
                return {...prevRole!, users: []}
            }
            return {
                ...prevRole,
                userId: options.map(option => option.value),
            };
        });
    };

    const usersOptions = users.map((user) => ({
        value: user.id,
        label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email}), Role: (${user.role})`,
    }));
    if (error) return <p>Error loading role details: {error}</p>;

    return (
        <div>
            <h2>Add Role</h2>
            <form onSubmit={handleSubmit}>
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
                </label>{" "}
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
                <button type="submit">Save New Role</button>
            </form>
        </div>
    );
};

export default AddRole;
