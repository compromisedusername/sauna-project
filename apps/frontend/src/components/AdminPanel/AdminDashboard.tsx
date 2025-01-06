import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Admin Dashboard</h2>

      <p>
        Click here to get reservations
        <button onClick={() => navigate("/admin/reservations")}>
          Reservations
        </button>
      </p>
      <p>
        Click here to get roles
        <button onClick={() => navigate("/admin/roles")}>Roles</button>
      </p>
      <p>
        Click here to get saunas
        <button onClick={() => navigate("/admin/saunas")}>Saunas</button>
      </p>
      <p>
        Click here to get users
        <button onClick={() => navigate("/admin/users")}>Users</button>
      </p>
    </>
  );
}
