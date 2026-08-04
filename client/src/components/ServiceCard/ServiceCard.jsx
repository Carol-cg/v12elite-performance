import "./ServiceCard.css";

function ServiceCard({
  title,
  description,
  image,
  alt,
}) {
  return (
    <div className="service-card">
      <img
        src={image}
        alt={alt}
        className="service-image"
      />

      <h3>{title}</h3>

      <p>{description}</p>

      <button>Learn More</button>
    </div>
  );
}

export default ServiceCard;