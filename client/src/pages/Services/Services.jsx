import { useState } from "react";
import ServicesPreview from "../../components/ServicesPreview/ServicesPreview";
import aiService from "../../services/aiService";
import "./Services.css";

function Services() {
  const [issue, setIssue] = useState("");
  const [details, setDetails] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRecommendation = () => {
    if (issue === "check-engine") {
      setRecommendation({
        service: "Performance Diagnostics",
        message:
          "We recommend a full engine diagnostic to identify the source of the warning light.",
      });
    } else if (issue === "brakes") {
      setRecommendation({
        service: "Brake Inspection",
        message:
          "Your brakes should be inspected for worn pads, damaged rotors, or another braking issue.",
      });
    } else if (issue === "engine") {
      setRecommendation({
        service: "Performance Diagnostics",
        message:
          "An engine running rough may involve ignition, fuel, sensor, or mechanical problems. We recommend a diagnostic inspection.",
      });
    } else if (issue === "ac") {
      setRecommendation({
        service: "A/C Service",
        message:
          "Your air conditioning system may need refrigerant service or leak detection.",
      });
    } else if (issue === "oil") {
      setRecommendation({
        service: "Routine Oil Service",
        message:
          "Your vehicle is due for an oil and filter change to protect engine performance and extend engine life.",
      });
    } else if (issue === "vibration") {
      setRecommendation({
        service: "Suspension & Tire Inspection",
        message:
          "A vehicle vibration can be caused by worn suspension components, tire imbalance, or drivetrain issues. We recommend a complete inspection.",
      });
    } else if (issue === "steering") {
      setRecommendation({
        service: "Wheel Alignment",
        message:
          "Your vehicle may need a wheel alignment or steering system inspection to correct pulling while driving.",
      });
    } else {
      setRecommendation(null);
    }
  };

  const handleAskAssistant = async () => {
    if (!question.trim()) return;

    try {
      setIsLoading(true);

      const response = await aiService.askAssistant(question);
      setAiAnswer(response.answer);
    } catch (error) {
      console.error(error);
      setAiAnswer("Sorry, I couldn't answer your question right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="services-page">
      <h1>Our Services</h1>

      <ServicesPreview />

      <section className="service-details">
        <article id="detailing" className="service-detail">
          <h2>Premium Auto Detailing</h2>
          <p>
            Our premium detailing service thoroughly cleans and restores your
            vehicle's interior and exterior. We focus on paint care, wheels,
            upholstery, trim, and every detail that makes your vehicle look its
            absolute best.
          </p>
        </article>

        <article id="ceramic" className="service-detail">
          <h2>Ceramic Coating</h2>
          <p>
            Ceramic coating provides long-lasting paint protection while
            enhancing gloss, making your vehicle easier to clean and protecting
            it from UV rays and environmental contaminants.
          </p>
        </article>

        <article id="diagnostics" className="service-detail">
          <h2>Performance Diagnostics</h2>
          <p>
            Our advanced diagnostic equipment identifies engine, electrical,
            performance, and sensor issues quickly, allowing our technicians to
            recommend the proper repair.
          </p>
        </article>

        <article id="maintenance" className="service-detail">
          <h2>Preventive Maintenance</h2>
          <p>
            Regular maintenance such as oil changes, brake inspections, filters,
            fluid checks, and tune-ups helps extend the life of your vehicle and
            keeps it performing at its best.
          </p>
        </article>
      </section>

      <h2>🤖 AI Service Advisor</h2>

      <p>
        Tell us what problem you're experiencing and we'll recommend the best
        service.
      </p>

      <form
        className="advisor-form"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <label htmlFor="issue">What problem are you experiencing?</label>

          <select
            id="issue"
            value={issue}
            onChange={(event) => setIssue(event.target.value)}
          >
            <option value="">Select a problem</option>
            <option value="check-engine">Check Engine Light</option>
            <option value="brakes">Brake Noise</option>
            <option value="engine">Engine Running Rough</option>
            <option value="ac">AC Not Cold</option>
            <option value="oil">Oil Change Needed</option>
            <option value="vibration">Strange Vibration</option>
            <option value="steering">Vehicle Pulls Left or Right</option>
          </select>
        </div>

        <div>
          <label htmlFor="details">Additional Details</label>

          <textarea
            id="details"
            rows="5"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>

        <button type="submit" onClick={handleRecommendation}>
          Get Recommendation
        </button>
      </form>

      {recommendation && (
        <section className="recommendation-card">
          <h3>Recommended Service</h3>

          <p>
            <strong>{recommendation.service}</strong>
          </p>

          <p>{recommendation.message}</p>
        </section>
      )}

      <section className="assistant-section">
        <h2>Ask the V12 Assistant</h2>

        <p>
          Ask a question about vehicle wraps, ceramic coating, detailing, paint
          protection, or maintenance.
        </p>

        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleAskAssistant();
            }
          }}
          placeholder="Example: Will a vehicle wrap damage factory paint?"
          rows="4"
        />

        <button
          type="button"
          onClick={handleAskAssistant}
          disabled={isLoading}
        >
          {isLoading ? "Thinking..." : "Ask Assistant"}
        </button>

        {aiAnswer && (
          <div className="assistant-answer">
            <h3>Assistant Answer</h3>
            <p>{aiAnswer}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Services;