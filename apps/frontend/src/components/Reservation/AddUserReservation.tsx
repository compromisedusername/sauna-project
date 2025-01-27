import React, { useState, useEffect } from "react";
import {useTranslation}from 'react-i18next'

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
import validateReservation from "./validateReservation";

const AddUserReservation = ({ userId }: { userId: number }) => {
const {t} = useTranslation<'pl'|'en'>();
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

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
    setValidationErrors([]);
    if (reservation) {
      const sauna: SaunaResponseGuests | undefined = saunas.find(s =>s.id === reservation.saunaId);
      const errors = validateReservation(reservation.dateFrom, reservation.dateTo, reservation.numberOfPeople, sauna?.peopleCapacity);
      if(errors.length > 0){
        setValidationErrors(errors)
        return;
      }
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

  if (error) return <p className='error'>Error loading reservation details: {error}</p>;

  const saunaOptions = saunas.map((sauna) => ({
    value: sauna.id,
    label: `Name: ${sauna.name}, Type: ${sauna.saunaType}, Capacity: ${sauna.peopleCapacity}`,
  }));

  return (
        <div className='container'>
            <button className='back-button' onClick={()=>navigate('/')}>

            {//@ts-ignore
               t('goback')}:
      </button>
            <h2 className='title'>


            {//@ts-ignore
               t('makereservation')}:
      </h2>
            <form className='add-form' onSubmit={handleSubmit}>
                 <div className="add-form-group">
                     <label className='form-label'>

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
                    <label className="form-label">

            {//@ts-ignore
               t('from')}:
                    </label>
                     <input
                            type="datetime-local"
                            name="dateFrom"
                            value={reservation.dateFrom.toString()}
                           onChange={handleInputChange}
                           className="input"
                     />
                </div>


                <div className="add-form-group">
                    <label  className="form-label">

            {//@ts-ignore
               t('to')}:
                    </label>
                      <input
                        type="datetime-local"
                        name="dateTo"
                        value={reservation.dateTo.toString()}
                        onChange={handleInputChange}
                           className="input"
                     />
                </div>

                <div className="add-form-group">
                    <label  className="form-label">

            {//@ts-ignore
               t('peopleCapacity')}:
                    </label>
                     <input
                        type="number"
                        name="numberOfPeople"
                        value={reservation.numberOfPeople}
                        onChange={handleInputChange}
                           className="input"
                     />
                </div>
              <button type="submit" className="submit-button">

            {//@ts-ignore
               t('addreservation')}:
        </button>
            </form>
        </div>
    );
};

export default AddUserReservation;
