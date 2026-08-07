import { Link } from "react-router-dom";
import "./ServiceCard.css";

function ServiceCard({
  title,
  description,
  image,
  alt,
  link,
  sectionId,
}) {
  return (
    <article className="service-card" id={sectionId}>
      {image && (
        <img
          src={image}
          alt={alt || title}
          className="service-image"
        />
      )}

      <h3>{title}</h3>

      <p>{description}</p>

      <Link to={link} className="learn-more-button">
        Learn More
      </Link>
    </article>
  );
}

export default ServiceCard;