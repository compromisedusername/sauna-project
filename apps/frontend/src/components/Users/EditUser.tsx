import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select, { ActionMeta, MultiValue } from "react-select";
import api from "../../api/api";
import {
  UserRequestAdd,
  ReservationWithoutUser,
  UserDto,
  UserRequestUpdate,
} from "../../models/User";
import { RoleDto } from "../../models/Role";
import { useParams } from "react-router-dom";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserRequestUpdate>({
    id: 0,
    name: "",
    surname: "",
    email: "",
    passwordHash: "weakPassword123!@#",
    roleId: 0,
    reservations: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<ReservationWithoutUser[]>(
    [],
  );
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get<UserDto>(`/user/${id}`);
        const userResponse = response.data;
        const user: UserRequestUpdate = {
          id: userResponse.id,
          name: userResponse.name,
          email: userResponse.email,
          surname: userResponse.surname,
          passwordHash: "strongPassword",
          roleId: userResponse.role.id,
          reservations: userResponse.reservations.map((r) => r.id),
        };
        setUser(user);
      } catch (error: any) {
        setError(error);
      }
    };

    const fetchReservations = async () => {
      try {
        const response =
          await api.get<ReservationWithoutUser[]>("/reservationsfree");

        const freeReservations: ReservationWithoutUser[] = response.data;

        setReservations(freeReservations);
        console.log(freeReservations);
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

    fetchUser();
    fetchReservations();
    fetchRoles();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const response = await api.put(`/user`, user);
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
    setUser((prevUser) => ({
      ...prevUser,
      roleId: option ? option.value : 0,
    }));
  };

  const handleReservationSelectChange = (
    options: MultiValue<{ value: number; label: string }>,
  ) => {
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

  if (error) return <p>Error loading user details: {error}</p>;

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

  const selectedRoleValue = user.roleId
    ? roleOptions.find((option) => option.value === user.roleId)
    : [];
  const selectedReservationValue = user.reservations
    ? reservationsOptions.find((option) => {
      return option.value in user.reservations;
    })
    : [];

  return (
    <div>
      <h2>Edit User</h2>
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
            value={selectedRoleValue}
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
            value={selectedReservationValue}
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

export default EditUser;
