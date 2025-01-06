import React from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function AdminPanel() {

  const { t, i18n } = useTranslation<'pl'|'en'>();
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="title">Administration</h2>

      <button
        className="action-button"
        onClick={() => navigate("/admin/reservations")}
      >

        {// @ts-ignore
          t('reservations')}
      </button>
      <button
        className="action-button"
        onClick={() => navigate("/admin/roles")}
      >

        {// @ts-ignore
          t('roles')}
      </button>

      <button
        className="action-button"
        onClick={() => navigate("/admin/saunas")}
      >
        {// @ts-ignore
          t('saunas')}
      </button>
      <button
        className="action-button"
        onClick={() => navigate("/admin/users")}
      >

        {// @ts-ignore
          t('users')}
      </button>
    </div>
  );
}
