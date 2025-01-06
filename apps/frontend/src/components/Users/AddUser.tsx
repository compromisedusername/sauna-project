import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import api from "../../api/api";
import { UserRequestAdd, ReservationWithoutUser } from "../../models/User";
import { RoleDto } from "../../models/Role";
import validateUser from "./validateUser";
import {useTranslation}from 'react-i18next'
interface AddUserProps { }

const AddUser: React.FC<AddUserProps> = () => {

const {t} = useTranslation<'pl'|'en'>();
    const [user, setUser] = useState<UserRequestAdd>({
        name: "",
        surname: "",
        email: "",
        passwordHash: "weakPassword123!@#",
        roleId: 0,
        reservations: [],
    });
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [selectedRoleOptions, setSelectedRoleOptions] = useState<{
        value: number;
        label: string;
    } | null>(null);
    const [selectedReservationsOptions, setSelectedReservationsOptions] =
        useState<MultiValue<{ value: number; label: string }>>([]);
    const [error, setError] = useState<string | null>(null);
    const [reservations, setReservations] = useState<ReservationWithoutUser[]>(
        [],
    );
    const [roles, setRoles] = useState<RoleDto[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response =
                    await api.get<ReservationWithoutUser[]>("/reservationsfree");

                const freeReservations: ReservationWithoutUser[] = response.data;

                setReservations(freeReservations);
            } catch (error: any) {
                console.error("Error fetching reservations:", error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await api.get<RoleDto[]>("/roles?users=false");
                setRoles(response.data);
            } catch (error: any) {
                console.log("Error fetching users", error);
            }
        };

        fetchReservations();
        fetchRoles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationErrors([]);
        if (user) {
            const errors = validateUser(user);
            if (errors.length > 0) {
                setValidationErrors(errors);
                return;
            }
            try {
                const response = await api.post(`/user`, user);
                console.log(response);
                navigate("/admin/users");
            } catch (error: any) {
                setError(`Error adding user: ${error.message}`);
            }
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleRoleSelectChange = (
        option: { value: number; label: string } | null,
    ) => {
        setSelectedRoleOptions(option);
        setUser((prevUser) => ({
            ...prevUser,
            roleId: option ? option.value : 0,
        }));
    };

    const handleReservationSelectChange = (
        options: MultiValue<{ value: number; label: string }>,
    ) => {
        setSelectedReservationsOptions(options);

        setUser((prevUser) => {
            if (!options) {
                return { ...prevUser, reservations: [] };
            }
            return {
                ...prevUser,
                reservations: options.map((option) => option.value),
            };
        });
    };

    if (error) return <p>Error: {error}</p>;

    const roleOptions = roles.map((role) => ({
        value: role.id,
        label: `Name: ${role.name}, Description: ${role.description}`,
    }));

    const reservationsOptions = reservations.map((reservation) => ({
        value: reservation.id,
        label: `Date From: ${new Date(reservation.dateFrom).toLocaleString()}, Date To: ${new Date(
            reservation.dateTo,
        ).toLocaleString()}, Sauna Type: (${reservation.sauna.saunaType
            }) Left seats: (${reservation.sauna.peopleCapacity - reservation.numberOfPeople})`,
    }));

    return (
        <div className="container">
            <button
                className="back-button"
                onClick={() => {
                    navigate("/admin/users");
                }}
            >
                Go back
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
            t('adduser')}

            </h2>

            <form onSubmit={handleSubmit} className="add-form">
                {validationErrors.length > 0 && (
                    <ul className="validation-errors">
                        {validationErrors.map((error, index) => (
                            <li key={index} className="validation-error">
                                {error}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="add-form-group">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="input"
                    />
                </div>
                <div className="add-form-group">
                    <label className="form-label">Surname:</label>
                    <input
                        type="text"
                        name="surname"
                        id="surname"
                        value={user.surname}
                        onChange={handleInputChange}
                        className="input"
                    />
                </div>
                <div className="add-form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="input"
                    />
                </div>
                <div className="add-form-group">
                    <label className="form-label">Password:</label>
                    <input
                        type="text"
                        name="passwordHash"
                        id="passwordHash"
                        value={user.passwordHash}
                        onChange={handleInputChange}
                        className="input"
                    />
                </div>
                <div className="add-form-group">
                    <label className="form-label">Role:</label>
                    <Select
                        options={roleOptions}
                        value={selectedRoleOptions}
                        onChange={handleRoleSelectChange}
                        placeholder="Select role..."
                        isSearchable
                        className="select"
                        classNamePrefix="select"
                    />
                </div>

                <div className="add-form-group">
                    <label className="form-label">Reservations:</label>
                    <Select
                        isMulti
                        options={reservationsOptions}
                        value={selectedReservationsOptions}
                        onChange={handleReservationSelectChange}
                        placeholder="Select reservation..."
                        isSearchable
                        className="select"
                        classNamePrefix="select"
                    />
                </div>

                <button type="submit" className="submit-button">
                    {//@ts-ignore
            t('savechanges')}
                </button>
            </form>
        </div>
    );
};

export default AddUser;
