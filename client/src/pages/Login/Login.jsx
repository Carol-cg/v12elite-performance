import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";



function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChanged"));

    
      navigate("/dashboard");
    
    } catch (error) {

  if (error.response?.status === 401) {
    setError("Invalid email or password.");
  } else {
    setError(
      error.response?.data?.message ||
      "Unable to log in right now. Please try again."
    );
  }
} finally {
  setIsLoading(false);
}
  };

  return (
  <main className="login-page">
    <section className="login-card">
      <div className="login-header">
        <span className="login-label">MEMBER LOGIN</span>

        <h1>Welcome Back</h1>

        <p>
          Sign in to manage your appointments and access your V12 account.
        </p>
      </div>

      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
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

        <div className="login-form-group">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button
          className="login-submit"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="login-register-text">
        New to V12 Elite Performance?{" "}
        <button
          className="login-register-link"
          type="button"
          onClick={() => navigate("/register")}
        >
          Create an account
        </button>
      </p>
    </section>
  </main>
);
}

export default Login;