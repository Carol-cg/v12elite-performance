import ServiceCard from "../ServiceCard/ServiceCard";
import "./ServicesPreview.css";

function ServicesPreview() {
  return (
    <section className="services-preview">
      <div className="services-preview-container">
        

        <div className="services-grid">
          <ServiceCard
            title="Premium Auto Detailing"
            description="Professional interior and exterior detailing designed to restore your vehicle's finish."
          />

          <ServiceCard
            title="Ceramic Coating"
            description="Long-lasting paint protection that adds gloss and helps protect against everyday contaminants."
          />

          <ServiceCard
            title="Performance Diagnostics"
            description="Computerized diagnostics to identify engine, electrical, and performance-related problems."
          />

          <ServiceCard
            title="Preventive Maintenance"
            description="Routine maintenance services that help keep your vehicle reliable and performing at its best."
          />
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;