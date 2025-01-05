
import React, { useState, useEffect } from "react";

import {  useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../api/api";
import {
    ReservationRequestAdd,
  UserReservationResponse,
} from "../../models/Reservation";
import { UserDto } from "../../models/User";
import { SaunaDto } from "../../models/Sauna";

const AddReservation  = () => {
  const [reservation, setReservation] = useState<ReservationRequestAdd>(
    {userId: 0, saunaId: 0, dateTo: new Date(Date.now()), dateFrom: new Date(Date.now()), numberOfPeople: 1  }


  );
  const [selectedUserOptions, setSelecetdUserOptions] = useState< {value: number; label: string } | null>(null);
  const [selectedSaunaOptions, setSelecetdSaunaOptions] = useState< {value: number; label: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserReservationResponse[]>([]);
  const [saunas, setSaunas] = useState<SaunaDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {


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

    fetchUsers();
    fetchSaunas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reservation) {
      try {
        console.log(reservation)
        const response = await api.post(`/reservation`, reservation);
        navigate("/admin/reservations");
      } catch (error: any) {
        setError(`Error adding reservation: ${error.message}`);
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
    setSelecetdUserOptions(option);
    setReservation(prevReservation => {
        return ({
      ...prevReservation,
        userId: option!.value
    })
});
  };

  const handleSaunaSelectChange = (option: { value: number; label: string } | null) => {
    setSelecetdSaunaOptions(option);
    setReservation(prevReservation => {
        return ({
      ...prevReservation,
        saunaId: option!.value
      })
});
  };

  if (error) return <p>Error loading reservation details: {error}</p>;

  const saunaOptions = saunas.map((sauna) => ({
    value: sauna.id,
    label: `Name: ${sauna.name}, Type: ${sauna.saunaType}, Capacity: ${sauna.peopleCapacity}`,
  }));


  const userOptions = users.map((user) => ({
    value: user.id,
    label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email})`,
  }));


  return (
    <div>
      <h2>Add Reservation</h2>
      <form onSubmit={handleSubmit}>

        <label>
          User:
          <Select
            options={userOptions}
            value={selectedUserOptions}
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
                reservation.dateFrom.toString()
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
               reservation.dateTo.toString()
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

export default AddReservation;
