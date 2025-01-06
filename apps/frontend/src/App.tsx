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
import { getIdFromToken, getRoleFromToken } from "./utils/jwt";
import AdminPanel from "./components/AdminPanel/AdminDashboard";
import ReservationsList from "./components/Reservation/ReservationList";
import UsersList from "./components/Users/UsersList";
import RolesList from "./components/Roles/RolesList";
import SaunasList from "./components/Saunas/SaunasList";
import EditReservation from "./components/Reservation/EditReservation";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser";
import AddSauna from "./components/Saunas/AddSauna";
import EditSauna from "./components/Saunas/EditSauna";
import AddRole from "./components/Roles/AddRole";
import EditRole from "./components/Roles/EditRole";
import SaunasGuestsList from "./components/Saunas/SaunasGuestsList";
import AddUserReservation from "./components/Reservation/AddUserReservation";
import UserReservationsList from "./components/Reservation/UserReservationsList";
import Navbar from "./components/Navbar/Navbar";
import { useTranslation } from "react-i18next";
function App() {
  const navigate = useNavigate;
  const { token, setToken } = useToken();
  const [role, setRole] = useState<string>("guest");
  const [userId, setUserId] = useState<number | null>(null);

  const { t, i18n } = useTranslation<'pl'|'en'>();

  useEffect(() => {
    setRole(getRoleFromToken(token));
    setUserId(getIdFromToken(token));
  }, [token]);

  return (

    <div className="wrapper">

      <BrowserRouter>
        <Navbar role={role} setToken={setToken} userId={userId}></Navbar>
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
              <Route
                path="/admin/reservation/add"
                element={<AddReservation />}
              />
              <Route
                path="/admin/user/:id/edit"
                element={<EditUser userId={null} role={role} />}
              />
              <Route path="/admin/user/add" element={<AddUser />} />
              <Route path="/admin/sauna/add" element={<AddSauna />} />
              <Route
                path="/admin/sauna/:id/edit"
                element={<EditSauna></EditSauna>}
              />

              <Route path="/admin/role/add" element={<AddRole />} />
              <Route path="/admin/role/:id/edit" element={<EditRole />} />
            </>
          )}
          {role === "user" && (
            <>
              <Route
                path="/user/edit"
                element={<EditUser role={role} userId={userId} />}
              />
              <Route
                path="/user/reservation/add"
                element={<AddUserReservation userId={userId!} />}
              />
              <Route
                path="/user/reservations"
                element={<UserReservationsList userId={userId!} />}
              />
            </>
          )}
          <Route path="/about/saunas" element={<SaunasGuestsList />} />
          <Route path="*" element={<Dashboard role={role}></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
