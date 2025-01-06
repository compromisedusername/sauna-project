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
            <button onClick={() => navigate("/register")}>Register</button>
          </p>
          <p>
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}>Login</button>
          </p>
          <p>See our saunas!
          <button onClick={()=>navigate('/about/saunas')}>See Saunas</button>
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
