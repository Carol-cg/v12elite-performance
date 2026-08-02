import { useState } from "react";
import ServicesPreview from "../../components/ServicesPreview/ServicesPreview";

function Services() {
  const [issue, setIssue] = useState("");
  const [details, setDetails] = useState("");
 const [recommendation, setRecommendation] = useState(null);

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
  } else {
    setRecommendation(null);
  }
};


 return (
    <main>
      <h1>Our Services</h1>

      
       <ServicesPreview />
      <h2>🤖 AI Service Advisor</h2>

      <p>
        Tell us what problem you're experiencing and we'll recommend the best
        service.
      </p>

      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="issue">
            What problem are you experiencing?
          </label>

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
          <label htmlFor="details">
            Additional Details
          </label>

          <textarea
            id="details"
            rows="5"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>

             <button
                type="submit"
                onClick={handleRecommendation}
>
               Get Recommendation
              </button>
      </form>



     {recommendation && (
  <section>
    <h3>Recommended Service</h3>

    <p>
      <strong>{recommendation.service}</strong>
    </p>

    <p>{recommendation.message}</p>
  </section>
)}


    </main>
  );
}

export default Services;