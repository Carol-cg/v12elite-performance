import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/" className="logo">
          V12 Elite Performance
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>

          {isAuthenticated ? (
            <>
              <Link to="/book">Schedule Service</Link>
              <Link to="/bookings">My Bookings</Link>

              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;