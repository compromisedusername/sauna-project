import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import useToken from "./components/Hooks/useToken";
import "./App.css";
import Login from "./components/Login/Login";
import AddReservation from "./components/Reservation/AddReservation";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Preferences from "./components/Preferences/Preference";
import Logout from "./components/Logout/Logout";
import { getRoleFromToken } from "./utils/jwt";
import AdminPanel from "./components/AdminPanel/AdminDashboard";
import ReservationsList from "./components/Reservation/ReservationList";
import UsersList from "./components/Users/UsersList";
import RolesList from "./components/Roles/RolesList";
import SaunasList from "./components/Saunas/SaunasList";
import EditReservation from "./components/Reservation/EditReservation";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser";
function App() {
  const navigate = useNavigate;
  const { token, setToken } = useToken();
  const [role, setRole] = useState("guest");

  useEffect(() => {
    setRole(getRoleFromToken(token));
  }, [token]);

  return (
    <div className="wrapper">
      <h1>Sauna reservation</h1>
      {role === "admin" ? <></> : <></>}
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
          {token && role !== "guest" && (
            <>
              <Route path="/dashboard" element={<Dashboard role={role} />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/logout" element={<Logout setToken={setToken} />} />
            </>
          )}

          {role === "admin" && (
            <>
              <Route path="/admin" element={<AdminPanel />} />
              <Route
                path="/admin/reservations"
                element={<ReservationsList />}
              />
              <Route path="/admin/roles" element={<RolesList />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/saunas" element={<SaunasList />} />
              <Route
                path="/admin/reservation/:id/edit"
                element={<EditReservation />}
              />
              <Route path="/admin/reservation/add" element={<AddReservation/>} />
              <Route
                path="/admin/user/:id/edit"
                element={<EditUser />}
              />
              <Route path="/admin/user/add" element={<AddUser/>} />
            </>
          )}
          <Route path="*" element={<Dashboard role={role}></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
