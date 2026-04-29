import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  .auth-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh; background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    padding: 24px; position: relative; overflow: hidden;
  }
  .auth-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .auth-bg {
    position: fixed; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 90% 80%, rgba(34,197,94,0.05) 0%, transparent 50%);
  }
  .auth-card {
    position: relative; z-index: 1;
    width: 100%; max-width: 440px;
    background: #161920; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 40px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.5);
    animation: fadeUp 0.5s ease both;
  }
  .auth-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; text-decoration: none; }
  .auth-logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 17px;
  }
  .auth-logo-text { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; color: #f0ede8; }
  .auth-logo-dot { color: #c9a84c; }
  .auth-title { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; letter-spacing: -0.02em; color: #f0ede8; margin-bottom: 6px; }
  .auth-sub { font-size: 0.88rem; color: #8a8fa8; margin-bottom: 32px; }
  .field-group { margin-bottom: 16px; }
  .field-label { display: block; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: #8a8fa8; margin-bottom: 7px; }
  .field {
    width: 100%; background: #1c2030; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 9px; color: #f0ede8; font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; padding: 13px 16px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
  .field::placeholder { color: #4a4f66; }
  .perks {
    background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.12);
    border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;
  }
  .perk-row { display: flex; align-items: center; gap: 8px; font-size: 0.83rem; color: #8a8fa8; margin-bottom: 6px; }
  .perk-row:last-child { margin-bottom: 0; }
  .perk-check { color: #22c55e; flex-shrink: 0; }
  .btn-submit {
    width: 100%; background: linear-gradient(135deg, #c9a84c, #e8c96a);
    color: #0a0a0a; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.95rem; letter-spacing: 0.04em; padding: 14px; border-radius: 9px;
    border: none; cursor: pointer; margin-top: 8px;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
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
    border-radius: 8px; padding: 12px 16px; font-size: 0.85rem; color: #ef4444;
    margin-bottom: 18px; animation: fadeIn 0.3s ease;
  }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
`;

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signupUser(form);
    setLoading(false);
    if (!res.error) {
      navigate("/");
    } else {
      setError(res.error || "Signup failed. Please try again.");
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

        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Join the platform. Play, win, and give back.</p>

        <div className="perks">
          {["Monthly draw entry with every subscription", "Choose a charity to support automatically", "Track your Stableford scores in one place"].map(p => (
            <div className="perk-row" key={p}>
              <span className="perk-check">✓</span> {p}
            </div>
          ))}
        </div>

        {error && <div className="error-box">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">Full Name</label>
            <input className="field" placeholder="John Smith" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <input className="field" type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="field-group">
            <label className="field-label">Password</label>
            <input className="field" type="password" placeholder="Min. 8 characters" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>

          <button className="btn-submit" disabled={loading}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <div className="divider" />
        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
