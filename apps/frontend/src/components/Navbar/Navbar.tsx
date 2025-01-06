import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
interface NavbarProps {
    role: string;
    setToken: (token: string) => void;
    userId: number | null;
}

const Navbar: React.FC<NavbarProps> = ({ role, setToken, userId }) => {
    const navigate = useNavigate();

  const { t, i18n } = useTranslation<'pl'|'en'>();
    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">
                    {
                        // @ts-ignore
                        t("banner")
                    }
                </Link>
            </div>
            <div className="navbar-links">
                <LanguageSwitcher></LanguageSwitcher>

                {role === "admin" && (
                    <>
                        <Link to="/admin" className="navbar-link">
                            {
                                // @ts-ignore
                                t("adminpanel")
                            }
                        </Link>
                        <Link to="/admin/reservations" className="navbar-link">
                            {
                                // @ts-ignore
                                t("reservations")
                            }
                        </Link>
                        <Link to="/admin/roles" className="navbar-link">
                            {
                                // @ts-ignore
                                t("roles")
                            }
                        </Link>
                        <Link to="/admin/users" className="navbar-link">
                            {
                                // @ts-ignore
                                t("users")
                            }
                        </Link>
                        <Link to="/admin/saunas" className="navbar-link">
                            {
                                // @ts-ignore
                                t("saunas")
                            }
                        </Link>
                        <button onClick={handleLogout} className="navbar-link">
                            {
                                // @ts-ignore
                                t("logout")
                            }
                        </button>
                    </>
                )}
                {role === "user" && (
                    <>
                        <Link to="/dashboard" className="navbar-link">
                            Dashboard
                        </Link>
                        <Link to={`/user/edit`} className="navbar-link">
                            {
                                // @ts-ignore
                                t("editmydata")
                            }
                        </Link>
                        <Link to={`/user/reservation/add`} className="navbar-link">

        {// @ts-ignore
          t('makereservation')}
                        </Link>
                        <Link to={`/user/reservations`} className="navbar-link">

        {// @ts-ignore
          t('myreservations')}
                        </Link>
                        <a  onClick={handleLogout} className="navbar-link">

        {// @ts-ignore
          t('logout')}
                        </a>
                    </>
                )}
                {role === "guest" && (
                    <>
                        <Link to="/login" className="navbar-link">

        {// @ts-ignore
          t('login')}
                        </Link>
                        <Link to="/register" className="navbar-link">

        {// @ts-ignore
          t('register')}
                        </Link>
                        <Link to="/about/saunas" className="navbar-link">

        {// @ts-ignore
          t('seesaunas')}
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
