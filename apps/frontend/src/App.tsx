import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import useToken from "./components/Hooks/useToken";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Preferences from "./components/Preferences/Preference";
import Logout from "./components/Logout/Logout";
import { getRoleFromToken } from "./utils/jwt";

function App() {
  const navigate = useNavigate;
  const { token, setToken } = useToken();
  const [role, setRole] = useState("guest");

  useEffect(() => {
    setRole(getRoleFromToken(token));
  }, [token]);

  console.log("ROLE", role);
  console.log(token);
  console.log(token && role !== "guest");
  return (
    <div className="wrapper">
      <h1>Sauna reservation</h1>
      <BrowserRouter>
        <Routes>
          {(!token || role === "guest") && (
            <>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route
                path="/register"
                element={<Register setToken={setToken} />}
              />
            </>
          )}
          { (token && role !== "guest") && (
            <>
              <Route path="/dashboard" element={<Dashboard role={role} />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/logout" element={<Logout setToken={setToken} />} />
            </>
          )}

          {role === "admin" && (
            <Route
              path="/dashboard/admin"
              element={<h2>Admin Panel (implement later)</h2>}
            />
          )}
        <Route path="*" element = {<Dashboard role={role}></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
