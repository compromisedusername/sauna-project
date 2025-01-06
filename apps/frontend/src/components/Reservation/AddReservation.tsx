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
import { SaunaDto } from "../../models/Sauna";
import validateReservation from "./validateReservation";

const AddReservation = () => {
  const [reservation, setReservation] = useState<ReservationRequestAdd>({
    userId: 0,
    saunaId: 0,
    dateTo: new Date(Date.now()),
    dateFrom: new Date(Date.now()),
    numberOfPeople: 1,
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedUserOptions, setSelecetdUserOptions] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [selectedSaunaOptions, setSelecetdSaunaOptions] = useState<{
    value: number;
    label: string;
  } | null>(null);
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
    setValidationErrors([]);
    if (reservation) {
      try {
        const sauna: SaunaDto | undefined = saunas.find(
          (s) => s.id === reservation.saunaId,
        );
        const errors = validateReservation(
          reservation.dateFrom,
          reservation.dateTo,
          reservation.numberOfPeople,
          sauna!.peopleCapacity,
        );
        if (errors.length > 0) {
          setValidationErrors(errors);
          return;
        }
        console.log(reservation);
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

  const handleUserSelectChange = (
    option: { value: number; label: string } | null,
  ) => {
    setSelecetdUserOptions(option);
    setReservation((prevReservation) => {
      return {
        ...prevReservation,
        userId: option!.value,
      };
    });
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

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `Name: ${user.name}, Surname: ${user.surname}, Email: (${user.email})`,
  }));


return (
    <div className="container">
        <button
            className="back-button"
            onClick={() => {
                navigate("/admin/reservations");
            }}
        >
            Go back
        </button>
      <h2 className="title">Add Reservation</h2>
         {validationErrors.length > 0 && (
                    <ul className="validation-errors">
                        {validationErrors.map((error, index) => (
                            <li key={index} className="validation-error">{error}</li>
                        ))}
                    </ul>
                )}
      <form onSubmit={handleSubmit} className="add-form">
        <div className="add-form-group">
            <label className="form-label">
                User:
            </label>
           <Select
             options={userOptions}
              value={selectedUserOptions}
               onChange={handleUserSelectChange}
            placeholder="Select user..."
             isSearchable
             className="select"
          />
        </div>



        <div className="add-form-group">
            <label  className="form-label">
              Sauna:
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
               <label className="form-label">
              Date From:
            </label>
            <input
            type="datetime-local"
              name="dateFrom"
              id="dateFrom"
              value={reservation.dateFrom.toString()}
              onChange={handleInputChange}
               className="input"
          />
        </div>


         <div className="add-form-group">
           <label  className="form-label">
              Date To:
            </label>
               <input
            type="datetime-local"
              name="dateTo"
              id="dateTo"
              value={reservation.dateTo.toString()}
              onChange={handleInputChange}
              className="input"
            />
        </div>


        <div className="add-form-group">
            <label  className="form-label">
                Number of People:
            </label>
               <input
            type="number"
            name="numberOfPeople"
              id="numberOfPeople"
            value={reservation.numberOfPeople}
            onChange={handleInputChange}
              className="input"
          />
        </div>


        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );

};

export default AddReservation;
