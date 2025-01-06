import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";

import api from "../../api/api";
import {
  SaunaRequestUpdate,
  SaunaRequestAdd,
  SaunaResponse,
} from "./../../models/Sauna";
import { ReservationResponse } from "../../models/Reservation";

const AddSauna = () => {
  const [sauna, setSauna] = useState<SaunaRequestAdd>({
    name: "",saunaType: "", humidity: 0, temperature: 0,
    peopleCapacity: 0, reservations: []
  });

  const [selectedReservationsOptions, setSelectedReservationsOptions] =
    useState<MultiValue<{ value: number; label: string }> | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get<ReservationResponse[]>("/reservations");

        setReservations(response.data);
      } catch (error: any) {
        console.error("Error fetching reservations:", error);
        setError(error);
      }
    };
    fetchReservations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    if(sauna){
    try{
      console.log(sauna);
      const response = await api.post('/sauna', sauna);
      console.log(response);
      navigate('/admin/saunas');
      }catch(error: any){
        setError(`Error adding sauna: ${error.message}`);
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {name, value} = e.target;
          setSauna( prevSauna => ({
      ...prevSauna, [name]: value
    }))
  };

  if (error) return <p>Error loading user details: {error}</p>;

  const handleReservationSelectChange = (
    options: MultiValue<{ value: number; label: string }>,
  ) => {
    setSelectedReservationsOptions(options);
    setSauna((prevSauna) => {
      if (!options) {
        return { ...prevSauna, reservations: [] };
      }
      return {
        ...prevSauna,
        reservations: options.map((option) => option.value),
      };
    });
  };

  const reservationsOptions = reservations.map((reservation) => ({
    value: reservation.id,
    label: `Date From: ${new Date(reservation.dateFrom).toLocaleString()}, Date To: ${new Date(
      reservation.dateTo,
    ).toLocaleString()}, Sauna Type: (${reservation.sauna?.saunaType
      }) `,
  }));

  return (
    <div>
      <h2>Add Sauna</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={sauna?.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sauna Type:
          <input
            type="text"
            name="saunaType"
            value={sauna?.saunaType}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Humidity:
          <input
            type="text"
            name="humidity"
            value={sauna?.humidity}
            onChange={handleInputChange}
          />
        </label>
        <label>
          People Capacity:
          <input
            type="text"
            name="peopleCapacity"
            value={sauna?.peopleCapacity}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Reservations:
          <Select
            isMulti
            options={reservationsOptions}
            value={selectedReservationsOptions}
            onChange={handleReservationSelectChange}
            placeholder="Select reservations..."
            isSearchable
          />
        </label>
        <button type="submit">Save New Sauna</button>
      </form>
    </div>
  );
};
export default AddSauna;
