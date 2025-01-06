import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../AdminPanel/AdminDashboard";
import UserPanel from "../UserPanel/UserPanel";

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
        <>
            {role === 'admin' ? (<>
              <AdminPanel></AdminPanel>
            </>): (<></>)}
            {role === 'user' ? (<>
              <UserPanel></UserPanel>
            </>):(<></>)}
          Click here to <button onClick={() => navigate("/logout")}>logout</button>
        </>
      )}
    </>
  );
}
