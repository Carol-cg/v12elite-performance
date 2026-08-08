import { useState } from "react";
import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const data = await registerUser(formData);

      setMessage(data.message || "Registration successful");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
   } catch (err) {
  if (err.response?.status === 429) {
    setError("Too many registration attempts. Please wait a few minutes and try again.");
  } else {
    setError(
      err.response?.data?.message ||
      "Unable to register right now. Please try again."
    );
  }
} finally {
  setIsSubmitting(false);
}
  };

  return (
  <main className="register-page">
    <section className="register-card">
      <div className="register-header">
        <span className="register-label">CREATE ACCOUNT</span>

        <h1>Join V12 Elite Performance</h1>

        <p>
          Create your account to schedule service and manage your appointments.
        </p>
      </div>

      {message && (
        <p className="register-success" role="status">
          {message}
        </p>
      )}

      {error && (
        <p className="register-error" role="alert">
          {error}
        </p>
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            maxLength="100"
            required
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            minLength="8"
            required
          />

          <small className="register-help">
            Password must be at least 8 characters and contain at least one
            number.
          </small>
        </div>

        <button
          className="register-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
              </form>

        <p className="register-footer">
          Already have an account?{" "}
          <a href="/login">Log In</a>
        </p>
      </section>
    </main>
  );
}
export default Register;