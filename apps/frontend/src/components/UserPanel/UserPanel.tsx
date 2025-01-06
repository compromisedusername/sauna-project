import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserPanel() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="title">User Dashboard</h2>

      <p className="click">Click here to see your reservations.</p>
      <button
        className="action-button"
        onClick={() => navigate("/user/reservations")}
      >
        See Reservations
      </button>
      <p  className="click">
        Click here to make reservation for sauna.
        <button className="action-button" onClick={() => navigate("/user/reservation/add")}>
         Make Reservation
        </button>
      </p>
        <p className="click">
        Click here to see our saunas.
        <button className="action-button" onClick={() => navigate("/about/saunas")}>See Saunas</button>
      </p>
        <p  className="click">
        Click here to edit your account
        <button className="action-button" onClick={() => navigate("/user/edit")}>Edit Account</button>
      </p>
    </div>
  );
}
