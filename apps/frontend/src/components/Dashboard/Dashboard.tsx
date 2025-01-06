import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../AdminPanel/AdminDashboard";
import UserPanel from "../UserPanel/UserPanel";
import { useTranslation } from "react-i18next";


export default function Dashboard({ role }: { role: string }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation<'pl'|'en'>();
  console.log(role);
  return (
    <div className="container">
      <h2 className="title">Dashboard</h2>
      {!role || role === "guest" ? (
        <div className="click">
          <p className="click">

        {// @ts-ignore
          t('donthaveanaccount')}
            {" "}
              <button className="action-button" onClick={() => navigate("/register")}>

        {// @ts-ignore
          t('register')}
            </button>
          </p>
           <p className="click">
        {// @ts-ignore
          t('alreadyhavaccount')}
            {" "}
             <button className="action-button" onClick={() => navigate("/login")}>


        {// @ts-ignore
          t('login')}
            </button>
           </p>
              <p className="click">

        {// @ts-ignore
          t('seesaunas-text')}
                <button className="action-button" onClick={()=>navigate('/about/saunas')}>

        {// @ts-ignore
          t('seesaunas-btn')}

            </button>
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
            <button className="action-button" onClick={() => navigate("/logout")}>

        {// @ts-ignore
          t('clicklogout')}
              </button>
         </p>
        </div>
      )}
    </div>
  );
}
