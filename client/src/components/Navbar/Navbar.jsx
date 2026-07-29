import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          V12 Elite Performance
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/book">Schedule Service</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;