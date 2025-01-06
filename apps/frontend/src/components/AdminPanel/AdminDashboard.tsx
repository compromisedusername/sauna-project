import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="title">Administration</h2>

      <button
        className="action-button"
        onClick={() => navigate("/admin/reservations")}
      >
        Reservations
      </button>
      <button
        className="action-button"
        onClick={() => navigate("/admin/roles")}
      >
        Roles
      </button>

      <button
        className="action-button"
        onClick={() => navigate("/admin/saunas")}
      >
        Saunas
      </button>
      <button
        className="action-button"
        onClick={() => navigate("/admin/users")}
      >
        Users
      </button>
    </div>
  );
}
