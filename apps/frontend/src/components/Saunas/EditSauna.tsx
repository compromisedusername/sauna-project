import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import api from "../../api/api";
import { SaunaRequestUpdate, SaunaResponse } from "./../../models/Sauna";
import { ReservationResponse } from "../../models/Reservation";

const EditSauna = () => {
  const { id } = useParams<{ id: string }>();
  const [sauna, setSauna] = useState<SaunaRequestUpdate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReservationsOptions, setSelectedReservationsOptions] =
    useState<MultiValue<{ value: number; label: string }> | null>(null);
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSauna = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await api.get<SaunaResponse>(`/sauna/${id}`);
          setSauna({
            id: response.data.id,
            name: response.data.name,
            saunaType: response.data.saunaType,
            humidity: response.data.humidity,
            temperature: response.data.temperature,
            peopleCapacity: response.data.peopleCapacity,
            reservations: response.data.reservations.map((r) => r.id),
          });
          setSelectedReservationsOptions(
            response.data.reservations.map((r) => ({
              value: r.id,
              label: `Date From: ${new Date(r.dateFrom).toLocaleString()}, Date To: ${new Date(
                r.dateTo,
              ).toLocaleString()}, Sauna Type: (${r.sauna?.saunaType
                }) `,
            })),
          );
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await api.get<ReservationResponse[]>("/reservations");

        setReservations(response.data);
      } catch (error: any) {
        console.error("Error fetching reservations:", error);
        setError(error);
      }
    };

    fetchSauna();
    fetchReservations();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sauna) {
      try {
        console.log(sauna);
        const response = await api.put(`/sauna`, sauna);
        console.log(response.statusText)
        navigate("/admin/saunas");
      } catch (error: any) {
        setError(`Error updating sauna: ${error.message}`);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSauna((prevSauna) => ({
      ...prevSauna!,
      [name]: value,
    }));
  };

  const handleReservationSelectChange = (
    options: MultiValue<{ value: number; label: string }>,
  ) => {
    setSelectedReservationsOptions(options);
    setSauna((prevSauna) => {
      if (!options) {
        return { ...prevSauna!, reservations: [] };
      }
      return {
        ...prevSauna!,
        reservations: options.map((option) => option.value),
      };
    });
  };

  if (loading) return <p>Loading sauna details...</p>;
  if (error) return <p>Error loading sauna details: {error}</p>;
  if (!sauna) return <p>Sauna not found.</p>;

  const reservationsOptions = reservations.map((reservation) => ({
    value: reservation.id,
    label: `Date From: ${new Date(reservation.dateFrom).toLocaleString()}, Date To: ${new Date(
      reservation.dateTo,
    ).toLocaleString()}, Sauna Type: (${reservation.sauna?.saunaType
      }) Left seats: (${reservation.sauna?.peopleCapacity - reservation.numberOfPeople})`,
  }));

  return (
    <div>
      <h2>Edit Sauna</h2>
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
          Temperature:
          <input
            type="text"
            name="temperature"
            value={sauna?.temperature}
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditSauna;