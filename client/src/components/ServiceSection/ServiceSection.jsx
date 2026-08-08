import "./ServiceSection.css";

function ServiceSection({
  title,
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

        <p>{description}</p>

        <ul>
          {features.map((feature) => (
            <li key={feature}>✓ {feature}</li>
          ))}
        </ul>

        <button className="service-button">
          Schedule Service
        </button>
      </div>
    </section>
  );
}

export default ServiceSection;