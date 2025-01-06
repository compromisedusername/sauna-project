import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import api from "../../api/api";
import { SaunaRequestAdd, SaunaResponse } from "./../../models/Sauna";
import { ReservationResponse } from "../../models/Reservation";
import validateNwSauna from "./validateSauna";

const AddSauna = () => {
  const [sauna, setSauna] = useState<SaunaRequestAdd>({
    name: "",
    saunaType: "",
    humidity: 0,
    temperature: 0,
    peopleCapacity: 0,
    reservations: [],
  });

  const [selectedReservationsOptions, setSelectedReservationsOptions] =
    useState<MultiValue<{ value: number; label: string }> | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
    if (sauna) {
      const errors = validateNwSauna(sauna);
      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }
      try {
        console.log(sauna);
        const response = await api.post("/sauna", sauna);
        console.log(response);
        navigate("/admin/saunas");
      } catch (error: any) {
        setError(`Error adding sauna: ${error.message}`);
      }
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSauna((prevSauna) => ({
      ...prevSauna,
      [name]: value,
    }));
  };
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

  if (error) return <p>Error loading user details: {error}</p>;

  const reservationsOptions = reservations.map((reservation) => ({
    value: reservation.id,
    label: `Date From: ${new Date(reservation.dateFrom).toLocaleString()}, Date To: ${new Date(
      reservation.dateTo,
    ).toLocaleString()}, Sauna Type: (${reservation.sauna?.saunaType}) `,
  }));

  return (
    <div className="container">
      <button
        className="back-button"
        onClick={() => {
          navigate("/admin/saunas");
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
      <h2 className="title">Add Sauna</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="add-form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={sauna?.name}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="saunaType" className="form-label">
            Sauna Type:
          </label>
          <input
            type="text"
            name="saunaType"
            id="saunaType"
            value={sauna?.saunaType}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="humidity" className="form-label">
            Humidity:
          </label>
          <input
            type="text"
            name="humidity"
            id="humidity"
            value={sauna?.humidity}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="peopleCapacity" className="form-label">
            People Capacity:
          </label>
          <input
            type="text"
            name="peopleCapacity"
            id="peopleCapacity"
            value={sauna?.peopleCapacity}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="temperature" className="form-label">
            Temperature:
          </label>
          <input
            type="text"
            name="temperature"
            id="temperature"
            value={sauna?.temperature}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="reservations" className="form-label">
            Reservations:
          </label>
          <Select
            isMulti
            options={reservationsOptions}
            value={selectedReservationsOptions}
            onChange={handleReservationSelectChange}
            placeholder="Select reservations..."
            isSearchable
            className="select"
            classNamePrefix="select"
          />
        </div>

        <button type="submit" className="submit-button">
          Save New Sauna
        </button>
      </form>
    </div>
  );
};
export default AddSauna;
