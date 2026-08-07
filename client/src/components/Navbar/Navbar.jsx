import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/v12-logo.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const updateAuthentication = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("authChanged", updateAuthentication);
    window.addEventListener("storage", updateAuthentication);

    return () => {
      window.removeEventListener("authChanged", updateAuthentication);
      window.removeEventListener("storage", updateAuthentication);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-link">
          <img
            src={logo}
            alt="V12 Elite Performance"
            className="navbar-logo"
          />
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/#about">About</Link>

          {isAuthenticated && (
            <Link to="/bookings">My Bookings</Link>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <div className="navbar-actions">
          <Link to="/book" className="schedule-nav-button">
            Schedule Service
          </Link>

          {isAuthenticated && (
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;