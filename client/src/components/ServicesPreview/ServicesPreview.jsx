import ServiceCard from "../ServiceCard/ServiceCard";
import "./ServicesPreview.css";

import detailingImage from "../../assets/services/detailing.png";
import ceramicImage from "../../assets/services/ceramic.png";
import diagnosticsImage from "../../assets/services/diagnostics.png";
import maintenanceImage from "../../assets/services/maintenance.png";

function ServicesPreview() {
  return (
    <section className="services-preview">
      <div className="services-preview-container">
        <div className="services-heading">
      <span>OUR SERVICES</span>
       <h2>Expert Care. Elevated Performance.</h2>
      </div>

        <div className="services-grid">
          <ServiceCard
            title="Premium Auto Detailing"
            description="Professional interior and exterior detailing designed to restore your vehicle's finish."
            image={detailingImage}
            alt="Premium auto detailing service"
            link="/services#detailing"
          />

          <ServiceCard
            title="Ceramic Coating"
            description="Long-lasting paint protection that adds gloss and helps protect against everyday contaminants."
            image={ceramicImage}
            alt="Ceramic coating applied to a vehicle"
            link="/services#ceramic"
          />

          <ServiceCard
            title="Performance Diagnostics"
            description="Computerized diagnostics to identify engine, electrical, and performance-related problems."
            image={diagnosticsImage}
            alt="Automotive performance diagnostics"
            link="/services#diagnostics"
          />

          <ServiceCard
            title="Preventive Maintenance"
            description="Routine maintenance services that help keep your vehicle reliable and performing at its best."
            image={maintenanceImage}
            alt="Preventive vehicle maintenance"
            link="/services#maintenance"
          />
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;