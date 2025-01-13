import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "./../../api/api";
import PropTypes from "prop-types";
import validateRegister from "./validateRegister";
import {useTranslation}from 'react-i18next'
type RegisterResponse = {
  response: string;
  statusCode: number;
  jwtToken: string;
};
async function registerUser(credentials: {
  email: string;
  password: string;
  name: string;
  surname: string;
}) {
  try {
    console.log(credentials);
    const response = await api.post<RegisterResponse>("/register", credentials);
    if (response.data && response.data.jwtToken) {
      console.log(response.data);
      return response.data.jwtToken;
    }
  } catch (error: any) {
    console.error("Error during register: ", error.response?.data);
    throw new Error(`Register failed. ${error.response.data["response"]} `);
  }
}

export default function Register({ setToken }: any) {
  const {t} = useTranslation<'pl'|'en'>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setValidationErrors([]);

      const errors: string[] = validateRegister(surname, name, password, email);
      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }
      const token = await registerUser({
        email,
        password,
        name,
        surname,
      });
      setToken(token);
    } catch (err: any) {
      setError(err.message);
    }
  };

return (
    <>
      <div className="login-wrapper">
        <h2 className="title">{
              // @ts-ignore
          t("register")}</h2>
        {error && <p className="validation-error">{error}</p>}

        {validationErrors.length > 0 && (
          <ul className="validation-errors">
            {validationErrors.map((error, index) => (
              <li key={index} className="validation-error">
                {error}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="add-form">
          <div className="add-form-group">
            <label className="form-label">{
              // @ts-ignore
              t("name")}</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="add-form-group">
            <label className="form-label">{
              // @ts-ignore
              t("surname")}</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          <div className="add-form-group">
            <label className="form-label">{
              // @ts-ignore
              t("email")}</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="add-form-group">
            <label className="form-label">{
              // @ts-ignore
              t("password")}</label>
            <input
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            {

              // @ts-ignore
              t("submit")}
          </button>
        </form>
      </div>

      <div className="decide-log">
        <p>
          <button
            className="action-button"
            onClick={() => navigate("/login")}
          >
            {

              // @ts-ignore
              t("alreadyhavaccount")}
          </button>
        </p>

        <p>
          <button
            className="action-button"
            onClick={() => {
              navigate("/dashboard");
              setToken("");
            }}
          >
            {

              // @ts-ignore
              t("continueguest")}
          </button>
        </p>
      </div>
    </>
  );


}

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};
