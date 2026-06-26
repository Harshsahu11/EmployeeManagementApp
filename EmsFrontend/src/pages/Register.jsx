import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { register } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await register(formData);
      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 700);
    } catch {
      setError("Registration failed. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="auth-logo">EMS</span>
          <h1>Create account</h1>
          <p>Register a user for your secured Employee Management backend.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Alert message={error} />
          <Alert message={success} type="success" />

          <label>
            Username
            <input name="username" value={formData.username} onChange={handleChange} minLength="3" required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" value={formData.password} onChange={handleChange} minLength="6" required />
          </label>

          <button className="primary-button full-width" type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
