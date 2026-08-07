import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
  <div className="hero-overlay">
    <div className="hero-content">

      

      <p className="hero-brand">
        V12 ELITE PERFORMANCE
      </p>

      <p className="hero-subheading">
        Premium Automotive Specialists
      </p>

      <h1>
        Precision.
        <br />
        Performance.
        <br />
        Perfection.
      </h1>

      <p className="hero-description">
        From routine maintenance and advanced diagnostics to ceramic coatings
        and performance upgrades, we deliver precision craftsmanship and
        exceptional care for every vehicle that enters our shop.
      </p>

      <Link
        to="/book"
        className="hero-button hero-button-primary"
      >
        Schedule Service
            </Link>

    </div>
  </div>
</section>
  );
}

export default Hero;