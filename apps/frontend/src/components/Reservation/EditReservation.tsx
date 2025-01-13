import React, { useState, useEffect } from "react";
import {useTranslation}from 'react-i18next'
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
import validateReservation from "./validateReservation";

const EditReservation = () => {
const {t} = useTranslation<'pl'|'en'>();
  const { id } = useParams<{ id: string }>();
  const [reservation, setReservation] = useState<ReservationResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
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
    setValidationErrors([]);
    if (reservation) {
      const sauna: SaunaDto | undefined = saunas.find(
        (s) => s.id === reservation.sauna.id,
      );
      const errors = validateReservation(reservation.dateFrom, reservation.dateTo, reservation.numberOfPeople, sauna!.peopleCapacity);
      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }
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

  const handleUserSelectChange = (
    option: { value: number; label: string } | null,
  ) => {
    setReservation((prevReservation) => {
      if (!prevReservation) {
        return null;
      }
      return {
        ...prevReservation,
        user: { ...prevReservation.user, id: option ? option.value : 0 },
      };
    });
  };

  const handleSaunaSelectChange = (
    option: { value: number; label: string } | null,
  ) => {
    setReservation((prevReservation) => {
      if (!prevReservation) {
        return null;
      }
      return {
        ...prevReservation,
        sauna: { ...prevReservation.sauna, id: option ? option.value : 0 },
      };
    });
  };

  if (loading) return <p>Loading reservation details...</p>;
  if (error) return <p>Error loading reservation details: {error}</p>;
  if (!reservation) return <p>Reservation not found.</p>;

  const saunaOptions = saunas.map((sauna) => ({
    value: sauna.id,
    label: `Name: ${sauna.name}, Type: ${sauna.saunaType}, Capacity: ${sauna.peopleCapacity}`,
  }));

  const selectedSaunaOptions = reservation.sauna?.id
    ? saunaOptions.find((option) => option.value === reservation.sauna.id)
    : [];

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email})`,
  }));

  const selectedUserOption = reservation.user?.id
    ? userOptions.find((option) => option.value === reservation.user.id)
    : [];

  return (
    <div className="container">
      <button
        className="back-button"
        onClick={() => {
          navigate("/admin/reservations");
        }}
      >
         {//@ts-ignore
               t('goback')}
      </button> {validationErrors.length > 0 && (
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
               t('edit')}
        {" "}
 {//@ts-ignore
               t('reservation')}
      </h2>
      <form onSubmit={handleSubmit} className="add-form">
        <p> {//@ts-ignore
               t('reservation')} ID: {reservation.id}</p>

        <div className="add-form-group">
          <label htmlFor="user" className="form-label">

            {//@ts-ignore
               t('user')}:
          </label>
          <Select
            options={userOptions}
            value={selectedUserOption}
            onChange={handleUserSelectChange}
            placeholder="Select user..."
            isSearchable
            className="select"
          />
        </div>

        <div className="add-form-group">
          <label htmlFor="sauna" className="form-label">

            {//@ts-ignore
               t('sauna')}:
          </label>
          <Select
            options={saunaOptions}
            value={selectedSaunaOptions}
            onChange={handleSaunaSelectChange}
            placeholder="Select sauna..."
            isSearchable
            className="select"
          />
        </div>
        <div className="add-form-group">
          <label htmlFor="dateFrom" className="form-label">

            {//@ts-ignore
               t('from')}:
          </label>
          <input
            type="datetime-local"
            name="dateFrom"
            id="dateFrom"
            value={
              reservation.dateFrom
                ? new Date(reservation.dateFrom).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="add-form-group">
          <label htmlFor="dateTo" className="form-label">

            {//@ts-ignore
               t('to')}:
          </label>
          <input
            type="datetime-local"
            name="dateTo"
            id="dateTo"
            value={
              reservation.dateTo
                ? new Date(reservation.dateTo).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="add-form-group">
          <label htmlFor="numberOfPeople" className="form-label">

            {//@ts-ignore
               t('peopleCapacity')}:
          </label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            value={reservation.numberOfPeople}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <button type="submit" className="submit-button">
           {//@ts-ignore
               t('save')}
        </button>
      </form>
    </div>
  );
};

export default EditReservation;
