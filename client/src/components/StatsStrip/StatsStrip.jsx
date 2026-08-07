import "./StatsStrip.css";

function StatsStrip() {
  return (
    <section className="stats-strip">
      <div className="stats-strip-container">
        <div className="stat-item">
          <span className="stat-value">15+</span>
          <span className="stat-label">Years Experience</span>
        </div>

        <div className="stat-item">
          <span className="stat-value">100%</span>
          <span className="stat-label">Quality Guarantee</span>
        </div>

        <div className="stat-item">
          <span className="stat-value">1,000+</span>
          <span className="stat-label">Happy Customers</span>
        </div>

        <div className="stat-item">
          <span className="stat-value stat-value-text">High Performance</span>
          <span className="stat-label">Is Our Standard</span>
        </div>
      </div>
    </section>
  );
}

export default StatsStrip;