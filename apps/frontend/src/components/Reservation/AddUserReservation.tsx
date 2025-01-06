import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../api/api";
import {
  ReservationRequestAdd,
  ReservationRequestUpdate,
  UserReservationResponse,
} from "../../models/Reservation";
import { UserDto } from "../../models/User";
import { SaunaDto, SaunaResponse, SaunaResponseGuests } from "../../models/Sauna";

const AddUserReservation = ({ userId }: { userId: number }) => {
  const [reservation, setReservation] = useState<ReservationRequestAdd>({
    userId: userId,
    saunaId: 0,
    dateTo: new Date(Date.now()),
    dateFrom: new Date(Date.now()),
    numberOfPeople: 1,
  });
  const [selectedSaunaOptions, setSelecetdSaunaOptions] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saunas, setSaunas] = useState<SaunaResponseGuests[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaunas = async () => {
      try {
        const response = await api.get<SaunaResponse[]>("/saunasguests");
        setSaunas(response.data);
      } catch (error: any) {
        console.log("Error fetching users", error);
      }
    };

    fetchSaunas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reservation) {
      try {
        console.log(reservation);
        const response = await api.post(`/reservation`, reservation);
        navigate("/");
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

  const handleSaunaSelectChange = (
    option: { value: number; label: string } | null,
  ) => {
    setSelecetdSaunaOptions(option);
    setReservation((prevReservation) => {
      return {
        ...prevReservation,
        saunaId: option!.value,
      };
    });
  };

  if (error) return <p>Error loading reservation details: {error}</p>;

  const saunaOptions = saunas.map((sauna) => ({
    value: sauna.id,
    label: `Name: ${sauna.name}, Type: ${sauna.saunaType}, Capacity: ${sauna.peopleCapacity}`,
  }));

  return (
    <div>
      <button onClick={()=>navigate('/')}>Go back</button>
      <h2>Make reservation for sauna</h2>
      <form onSubmit={handleSubmit}>
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
            value={reservation.dateFrom.toString()}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Date To:
          <input
            type="datetime-local"
            name="dateTo"
            value={reservation.dateTo.toString()}
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

        <button type="submit">Add Reservation</button>
      </form>
    </div>
  );
};

export default AddUserReservation;
