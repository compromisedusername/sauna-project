import React, { useState, useEffect } from "react";

import {useTranslation}from 'react-i18next'
import { useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import api from "../../api/api";
import {
	UserRequestAdd,
	ReservationWithoutUser,
	UserDto,
	UserRequestUpdate,
} from "../../models/User";
import { RoleDto } from "../../models/Role";
import { useParams } from "react-router-dom";
import validateUser from "./validateUser";

const EditUser = ({
	userId,
	role,
}: {
	userId: number | null;
	role: string;
}) => {
	let { id } = useParams<{ id: string }>();
	if (!id && userId !== null && role !== "admin") {
		id = String(userId);
	}

const {t} = useTranslation<'pl'|'en'>();
	const [user, setUser] = useState<UserRequestUpdate>({
		userId: Number(id),
		name: "",
		surname: "",
		email: "",
		passwordHash: "weakPassword123!@#",
		roleId: 0,
		reservations: [],
	});
	const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
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
					userId: userResponse.id,
					name: userResponse.name,
					email: userResponse.email,
					surname: userResponse.surname,
					passwordHash: null,
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
					await api.get<ReservationWithoutUser[]>("/reservations");

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
		if (role === "admin") {
			fetchReservations();
			fetchRoles();
		}
	}, [id, role]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
        setValidationErrors([]);
		if (user) {
			const errors: string[] = validateUser(user);
			if(errors.length > 0){
					setValidationErrors(errors);
				return;
			}
			try {
				const response = await api.put(`/user`, user);
				navigate("/admin/users");
			} catch (error: any) {
					setError(
						`Error: ${error.response.data.response || error.message} `,
					);

			}
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({
			...prevUser!,
			[name]: value,
		}));
	};

	const handleRoleSelectChange = (
		option: { value: number; label: string } | null,
	) => {
		setUser((prevUser) => ({
			...prevUser!,
			roleId: option ? option.value : 0,
		}));
	};

	const handleReservationSelectChange = (
		options: MultiValue<{ value: number; label: string }>,
	) => {
		setUser((prevUser) => {
			if (!options) {
				return { ...prevUser!, reservations: [] };
			}
			return {
				...prevUser!,
				reservations: options.map((option) => option.value),
			};
		});
	};


	const roleOptions = roles.map((role) => ({
		value: role.id,
		label: `Name: ${role.name}, Description: ${role.description}`,
	}));

	const reservationsOptions = reservations.map((reservation) => ({
		value: reservation.id,
		label: `Date From: ${new Date(reservation.dateFrom).toLocaleString()}, Date To: ${new Date(
			reservation.dateTo,
		).toLocaleString()}, ${
			reservation.sauna
				? "Sauna Type: (" +
					reservation.sauna.saunaType +
					"), Sauna Name: (" +
					reservation.sauna.name +
					")"
				: "No sauna"
		} `,
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
		<div className="container">

<div><button
		className="back-button"
    onClick={()=>{
				  if(role==='admin'){
				    navigate('/admin/users')
				  }else if(role==='user'){
				    navigate('/')
				  }
				}}>Go back</button></div>


		  <h2 className="error">{ (error? error:null)}</h2>
			<h2 className="title">
{//@ts-ignore
            t('edituser')}

			</h2>
			<form onSubmit={handleSubmit} className="add-form">
                {validationErrors.length > 0 && (
                    <ul className="validation-errors">
                        {validationErrors.map((error, index) => (
                            <li key={index} className="validation-error">{error}</li>
                        ))}
                    </ul>
                )}
                  <div className="add-form-group">
                      <label className="form-label">
                            {//@ts-ignore
            t('name')}
                        </label>
                        <input
                            type="text"
                            name="name"
                             id="name"
                            value={user.name}
                            onChange={handleInputChange}
                               className="input"
                        />
                </div>
                 <div className="add-form-group">
                      <label className="form-label">
                            {//@ts-ignore
            t('surname')}
                        </label>
                       <input
                            type="text"
                            name="surname"
                             id="surname"
                            value={user.surname}
                            onChange={handleInputChange}
                               className="input"
                       />
                 </div>
                <div className="add-form-group">
                    <label className="form-label">
                        Email:
                    </label>
                    <input
                        type="text"
                        name="email"
                          id="email"
                        value={user.email}
                        onChange={handleInputChange}
                           className="input"
                    />
                </div>

                <div className="add-form-group">
                    <label className="form-label">
                        {//@ts-ignore
            t('password')}
                    </label>
                    <input
                        type="password"
                        name="passwordHash"
                        id="passwordHash"
                        value={user.passwordHash ? user.passwordHash : ""}
                        onChange={handleInputChange}
                         placeholder="************"
                       className="input"
                    />
                </div>

				{role === "admin" && (
					<>
                        <div className="add-form-group">
                            <label className="form-label">
                                {//@ts-ignore
            t('role')}
                            </label>
                            <Select
                                options={roleOptions}
                                value={selectedRoleValue}
                                onChange={handleRoleSelectChange}
                                placeholder="Select role..."
                                isSearchable
                                    className="select"
                                    classNamePrefix="select"
                            />
                        </div>

                        <div className="add-form-group">
                             <label className="form-label">
                                {//@ts-ignore
            t('reservations')}
                            </label>
                            <Select
                                isMulti
                                options={reservationsOptions}
                                value={selectedReservationValue}
                                onChange={handleReservationSelectChange}
                                placeholder="Select reservation..."
                                isSearchable
                                className="select"
                                  classNamePrefix="select"
                            />
                        </div>
					</>
				)}
				<br />
    <button type="submit" className="submit-button">
{//@ts-ignore
            t('savechanges')}

    		</button>
			</form>
		</div>
	);
};

export default EditUser;
