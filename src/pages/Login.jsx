import { useState, useEffect } from "react";
import { loginUser } from "../services/api";
import { setToken, getToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  .auth-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    position: relative; overflow: hidden;
  }
  .auth-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .auth-bg {
    position: fixed; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 10% 80%, rgba(34,197,94,0.04) 0%, transparent 50%);
  }
  .auth-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 420px;
    background: #161920;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.5);
    animation: fadeUp 0.5s ease both;
  }
  .auth-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 32px;
    text-decoration: none;
  }
  .auth-logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
  }
  .auth-logo-text {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; color: #f0ede8;
  }
  .auth-logo-dot { color: #c9a84c; }
  .auth-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem; font-weight: 800; letter-spacing: -0.02em; color: #f0ede8;
    margin-bottom: 6px;
  }
  .auth-sub { font-size: 0.88rem; color: #8a8fa8; margin-bottom: 32px; }
  .field-group { margin-bottom: 18px; }
  .field-label {
    display: block; font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase; color: #8a8fa8; margin-bottom: 7px;
  }
  .field {
    width: 100%; background: #1c2030;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 9px; color: #f0ede8;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    padding: 13px 16px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
  .field::placeholder { color: #4a4f66; }
  .btn-submit {
    width: 100%;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    color: #0a0a0a;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.95rem; letter-spacing: 0.04em;
    padding: 14px; border-radius: 9px; border: none; cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-top: 8px;
    box-shadow: 0 0 24px rgba(201,168,76,0.15);
  }
  .btn-submit:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 0 32px rgba(201,168,76,0.3); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .auth-footer { text-align: center; margin-top: 24px; font-size: 0.875rem; color: #8a8fa8; }
  .auth-link { color: #c9a84c; text-decoration: none; font-weight: 500; }
  .auth-link:hover { text-decoration: underline; }
  .divider { height: 1px; background: rgba(255,255,255,0.07); margin: 24px 0; }
  .error-box {
    background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25);
    border-radius: 8px; padding: 12px 16px;
    font-size: 0.85rem; color: #ef4444; margin-bottom: 18px;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
`;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await loginUser(form);
    setLoading(false);
    if (res.token) {
      setToken(res.token);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("userId", res.user.id);
      navigate(res.user?.role === "admin" ? "/admin" : "/dashboard");
    } else {
      setError(res.error || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-root">
      <style>{S}</style>
      <div className="auth-bg" />

      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">⛳</div>
          <span className="auth-logo-text">Golf<span className="auth-logo-dot">Draw</span></span>
        </Link>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to access your dashboard and scores</p>

        {error && <div className="error-box">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <input
              className="field"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              className="field"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button className="btn-submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <div className="divider" />
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">Create one free</Link>
        </p>
      </div>
    </div>
  );
}
