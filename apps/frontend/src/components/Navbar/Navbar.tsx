import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
interface NavbarProps {
    role: string;
    setToken: (token: string ) => void;
    userId: number | null;
}

const Navbar: React.FC<NavbarProps> = ({ role, setToken, userId }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken('');
          localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className="navbar">
             <div className="navbar-brand">
                <Link to="/" className="navbar-logo">Sauna Reservation</Link>
             </div>
           <div className="navbar-links">

        <LanguageSwitcher></LanguageSwitcher>

            {role === "admin" && (
                <>
                  <Link to="/admin" className="navbar-link">Admin Panel</Link>
                  <Link to="/admin/reservations" className="navbar-link">Reservations</Link>
                  <Link to="/admin/roles" className="navbar-link">Roles</Link>
                  <Link to="/admin/users" className="navbar-link">Users</Link>
                   <Link to="/admin/saunas" className="navbar-link">Saunas</Link>
                    <a onClick={handleLogout} className="navbar-link">Logout</a>
                </>
            )}
            {role === "user" && (
                <>
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                    <Link to={`/user/edit`} className="navbar-link">Edit my data</Link>
                    <Link to={`/user/reservation/add`} className="navbar-link">Make Reservation</Link>
                    <Link to={`/user/reservations`} className="navbar-link">My Reservations</Link>
                    <a onClick={handleLogout} className="navbar-link">Logout</a>
                </>
            )}
            {role === "guest" && (
                <>
                    <Link to="/login" className="navbar-link">Login</Link>
                    <Link to="/register" className="navbar-link">Register</Link>
                    <Link to="/about/saunas" className="navbar-link">See Saunas</Link>
                </>
            )}
            </div>
        </nav>
    );
};

export default Navbar;
