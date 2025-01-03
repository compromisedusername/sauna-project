import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ role }: { role: string }) {
  const navigate = useNavigate();
  console.log(role);
  return (
    <>
      <h2>Dashboard</h2>
      {!role || role === "guest" ? (
        <>

          {" "}
          <p>
            Don't have an account?{" "}
            <a onClick={() => navigate("/register")}>Register</a>
          </p>
          <p>
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Login</a>
          </p>
        </>
      ) : (
        <p>
          Click here to <a onClick={() => navigate("/logout")}>logout</a>
        </p>
      )}
    </>
  );
}
