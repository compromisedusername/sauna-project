import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../api/api";
import {
  ReservationRequestUpdate,
  ReservationResponse,
  UserReservationResponse,
} from "../../models/Reservation";
import { UserDto } from "../../models/User";
import { SaunaDto } from "../../models/Sauna";
interface EditReservationProps { }

const EditReservation: React.FC<EditReservationProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [reservation, setReservation] = useState<ReservationResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserReservationResponse[]>([]);
  const [saunas, setSaunas] = useState<SaunaDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservation = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await api.get<ReservationResponse>(
            `/reservation/${id}`,
          );
          setReservation(response.data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get<UserDto[]>("/users");

        const users: UserReservationResponse[] = response.data.map((user) => {
          return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
          };
        });

        setUsers(users);
      } catch (error: any) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchSaunas = async () => {
      try {
        const response = await api.get<SaunaDto[]>("/saunas");
        setSaunas(response.data);
      } catch (error: any) {
        console.log("Error fetching users", error);
      }
    };

    fetchReservation();
    fetchUsers();
    fetchSaunas();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reservation) {
      try {
        const reservationUpdate: ReservationRequestUpdate = {
          id: reservation.id,
          dateTo: reservation.dateTo,
          dateFrom: reservation.dateFrom,
          saunaId: reservation.sauna.id,
          userId: reservation.user.id,
          numberOfPeople: reservation.numberOfPeople,
        };
        const response = await api.put(`/reservation`, reservationUpdate);
        navigate("/admin/reservations");
      } catch (error: any) {
        setError(`Error updating reservation: ${error.message}`);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setReservation((prevReservation) => ({
      ...prevReservation!,
      [name]: value,
    }));
  };

const handleUserSelectChange = (option: { value: number; label: string } | null) => {
    setReservation(prevReservation => {
        if(!prevReservation){
            return null
        }
        return ({
      ...prevReservation,
      user: { ...prevReservation.user, id: option ? option.value : 0 },
    })
});
  };

  const handleSaunaSelectChange = (option: { value: number; label: string } | null) => {
    setReservation(prevReservation => {
          if(!prevReservation){
            return null
        }
        return ({
      ...prevReservation,
      sauna: { ...prevReservation.sauna, id: option ? option.value : 0 },
    })
});
  };

  if (loading) return <p>Loading reservation details...</p>;
  if (error) return <p>Error loading reservation details: {error}</p>;
  if (!reservation) return <p>Reservation not found.</p>;

  const saunaOptions = saunas.map((sauna) => ({
    value: sauna.id,
    label: `Name: ${sauna.name}, Type: ${sauna.saunaType}, Capacity: ${sauna.peopleCapacity}`,
  }));

  const selectedSaunaOptions = reservation.sauna.id
    ? saunaOptions.find((option) => option.value === reservation.sauna.id)
    : [];

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email})`,
  }));

  const selectedUserOption = reservation.user.id
    ? userOptions.find((option) => option.value === reservation.user.id)
    : [];

  return (
    <div>
      <h2>Edit Reservation</h2>
      <form onSubmit={handleSubmit}>
        <p>Reservation ID: {reservation.id}</p>

        <label>
          User:
          <Select
            options={userOptions}
            value={selectedUserOption}
            onChange={handleUserSelectChange}
            placeholder="Select user..."
            isSearchable
          />
        </label>
        <br />

        <label>
          Sauna:
          <Select
            options={saunaOptions}
            value={selectedSaunaOptions}
            onChange={handleSaunaSelectChange}
            placeholder="Select sauna..."
            isSearchable
          />
        </label>
        <label>
          Date From:
          <input
            type="datetime-local"
            name="dateFrom"
            value={
              reservation.dateFrom
                ? new Date(reservation.dateFrom).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Date To:
          <input
            type="datetime-local"
            name="dateTo"
            value={
              reservation.dateTo
                ? new Date(reservation.dateTo).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Number of People:
          <input
            type="number"
            name="numberOfPeople"
            value={reservation.numberOfPeople}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditReservation;
