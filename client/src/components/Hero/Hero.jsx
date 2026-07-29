import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Premium Auto Detailing</h1>

        <p>
          Premium automotive detailing and ceramic coating services for
          enthusiasts who expect perfection.
        </p>

        <div className="hero-buttons">
          <button>Book Appointment</button>

          <button>View Services</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;