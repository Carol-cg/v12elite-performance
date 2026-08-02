import { Link } from "react-router-dom";

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
          <Link to="/book">
         
         <button>Schedule Service</button>
       
        </Link>

       <Link to="/services">
          <button>View Services</button>
         
         </Link>
        
      </div>
        
        </div>
    </section>
  );
}

export default Hero;