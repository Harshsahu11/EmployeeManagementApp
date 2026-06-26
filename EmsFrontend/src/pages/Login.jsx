import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { login, saveAuth } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
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
    setIsLoading(true);

    try {
      const response = await login(formData);
      saveAuth(response.data);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="auth-logo">EMS</span>
          <h1>Welcome back</h1>
          <p>Sign in with your Spring Boot JWT account to manage employees and departments.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Alert message={error} />

          <label>
            Email
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" value={formData.password} onChange={handleChange} minLength="6" required />
          </label>

          <button className="primary-button full-width" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
