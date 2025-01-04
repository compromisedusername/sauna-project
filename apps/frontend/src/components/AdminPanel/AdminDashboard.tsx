
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Admin Dashboard</h2>

          <p>
        Click here to get reservations
        <a onClick={() => navigate("/admin/reservations")}>Reservations</a>
          </p>
          <p>
        Click here to get roles
            <a onClick={() => navigate("/admin/roles")}>Roles</a>
          </p>
          <p>
        Click here to get saunas
        <a onClick={() => navigate("/admin/saunas")}>Saunas</a>
          </p>
          <p>
        Click here to get users
        <a onClick={() => navigate("/admin/users")}>Users</a>
          </p>
        </>
  );
}
