import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./../../api/api";
import "./Login.css";
import PropTypes from "prop-types";
import validateLogin from "./validateLogin";

type LoginResponse = {
  response: string;
  statusCode: number;
  jwtToken: string;
};
async function loginUser(credentials: { email: string; password: string }) {
  try {
    const response = await api.post<LoginResponse>("/login", credentials);
    if (response.data && response.data.jwtToken) {
      console.log(response.data);
      if (!response.data.jwtToken) {
        throw new Error("Login failed. Try again");
      }
      return response.data.jwtToken;
    }
  } catch (error: any) {
    console.error("Error during login: ", error.response?.data);
    throw new Error(`Login failed. ${error.response.data["response"]} `);
  }
}

export default function Login({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setValidationErrors([]);

      const errors: string[] = validateLogin(email, password);
      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }

      const token = await loginUser({
        email,
        password,
      });
      setToken(token!);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        {validationErrors.length > 0 && (
          <ul className="validation-errors">
            {validationErrors.map((error, index) => (
              <li key={index} className="validation-error">
                {error}
              </li>
            ))}
          </ul>
        )}
        <h1>Please Log In</h1>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button className="action-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="decide-log">
        <p>
          <button
            className="action-button"
            onClick={() => navigate("/register")}
          >
            Dont have an acoount? Register
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
            Continue As Guest
          </button>
        </p>
      </div>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
