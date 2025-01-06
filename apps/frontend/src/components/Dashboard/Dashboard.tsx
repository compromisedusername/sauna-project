import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../AdminPanel/AdminDashboard";
import UserPanel from "../UserPanel/UserPanel";


export default function Dashboard({ role }: { role: string }) {
  const navigate = useNavigate();
  console.log(role);
  return (
    <div className="container">
      <h2 className="title">Dashboard</h2>
      {!role || role === "guest" ? (
        <div className="click">
          <p className="click">
            Don't have an account?{" "}
              <button className="action-button" onClick={() => navigate("/register")}>Register</button>
          </p>
           <p className="click">
            Already have an account?{" "}
             <button className="action-button" onClick={() => navigate("/login")}>Login</button>
           </p>
              <p className="click">See our saunas!
                <button className="action-button" onClick={()=>navigate('/about/saunas')}>See Saunas</button>
              </p>
        </div>
      ) : (
        <div className="click">
          {role === 'admin' ? (<>
              <AdminPanel></AdminPanel>
            </>): (<></>)}
            {role === 'user' ? (<>
              <UserPanel></UserPanel>
            </>):(<></>)}
         <p className="form-label">
            <button className="action-button" onClick={() => navigate("/logout")}>Clik here to Logout</button>
         </p>
        </div>
      )}
    </div>
  );
}
