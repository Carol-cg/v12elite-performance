import "./ServiceSection.css";
import { Link } from "react-router-dom";
import "./ServiceSection.css";


function ServiceSection({
  title,
  category,
  duration,
  description,
  image,
  imageAlt,
  features,
  reverse = false,
}) {
  return (
    <section className={`service-section ${reverse ? "reverse" : ""}`}>
      <div className="service-image">
        <img src={image} alt={imageAlt} />
      </div>

      <div className="service-content">
        <h2>{title}</h2>
         <div className="service-meta">
     <span>{category}</span>
      <span>{duration}</span>
     
     </div>
        <p>{description}</p>

        <ul>
          {features.map((feature) => (
            <li key={feature}>✓ {feature}</li>
          ))}
        </ul>

       <Link to="/book" className="service-button">
                Schedule Service
        </Link>
      </div>
    </section>
  );
}

export default ServiceSection;