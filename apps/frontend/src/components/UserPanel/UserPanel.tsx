
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserPanel() {
  const navigate = useNavigate();
  return (
    <>
      <h2>User Dashboard</h2>

      <p>Click here to see your reservations.</p>
      <button onClick={()=>navigate('/user/reservations')}>See Reservations</button>
      <p>
        Click here to make reservation for sauna.
        <button onClick={() => navigate("/user/reservation/add")}>
         Make Reservation
        </button>
      </p>
      <p>
        Click here to see our saunas.
        <button onClick={() => navigate("/about/saunas")}>See Saunas</button>
      </p>
      <p>
        Click here to edit your account
        <button onClick={() => navigate("/user/edit")}>Edit Account</button>
      </p>
    </>
  );
}

