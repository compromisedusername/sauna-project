import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select, { ActionMeta, MultiValue } from "react-select";
import api from "../../api/api";
import { UserRequestAdd, ReservationWithoutUser } from "../../models/User";
import { RoleDto } from "../../models/Role";

interface AddUserProps {}

const AddUser: React.FC<AddUserProps> = () => {
    const [user, setUser] = useState<UserRequestAdd>({
        name: "",
        surname: "",
        email: "",
        passwordHash: "weakPassword123!@#",
        roleId: 0,
        reservations: [],
    });
    const [selectedRoleOptions, setSelectedRoleOptions] = useState<{
        value: number;
        label: string;
    } | null>(null);
      const [selectedReservationsOptions, setSelectedReservationsOptions] = useState<
        MultiValue<{ value: number; label: string }>
    >([]);
    const [error, setError] = useState<string | null>(null);
    const [reservations, setReservations] = useState<ReservationWithoutUser[]>([]);
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get<ReservationWithoutUser[]>("/reservationsfree");

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
        if (user) {
            console.log(user)
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
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleRoleSelectChange = (
        option: { value: number; label: string } | null
    ) => {
        setSelectedRoleOptions(option);
        setUser((prevUser) => ({
            ...prevUser,
            roleId: option ? option.value : 0,
        }));
    };

  const handleReservationSelectChange = (
        options: MultiValue<{ value: number; label: string }>
    ) => {
    setSelectedReservationsOptions(options);

    setUser((prevUser) => {
        if (!options) {
            return {...prevUser, reservations: []};
        }
        return {
            ...prevUser,
           reservations: options.map(option => option.value)
        };
    });
};

    if (error) return <p>Error loading user details: {error}</p>;

    const roleOptions = roles.map((role) => ({
        value: role.id,
        label: `Name: ${role.name}, Description: ${role.description}`,
    }));

    const reservationsOptions = reservations.map((reservation) => ({
        value: reservation.id,
        label: `Date From: ${new Date(reservation.dateFrom).toLocaleString()}, Date To: ${new Date(
            reservation.dateTo
        ).toLocaleString()}, Sauna Type: (${reservation.sauna.saunaType
        }) Left seats: (${reservation.sauna.peopleCapacity - reservation.numberOfPeople})`
    }));

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
               <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                    />
                </label>
                 <label>
                    Surname:
                    <input
                        type="text"
                        name="surname"
                        value={user.surname}
                        onChange={handleInputChange}
                    />
                </label>
                 <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </label>
                 <label>
                   Password:
                    <input
                        type="text"
                        name="passwordHash"
                        value={user.passwordHash}
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Role:
                    <Select
                        options={roleOptions}
                        value={selectedRoleOptions}
                        onChange={handleRoleSelectChange}
                        placeholder="Select role..."
                        isSearchable
                    />
                </label>
                <br />
               <label>
                    Reservations:
                    <Select
                    isMulti
                        options={reservationsOptions}
                        value={selectedReservationsOptions}
                       onChange={handleReservationSelectChange}
                        placeholder="Select reservation..."
                        isSearchable
                    />
                </label>

                <br />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default AddUser;
