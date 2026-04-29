import { useState } from "react";
import { getToken } from "../utils/auth";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  .sc-root { font-family: 'DM Sans', sans-serif; background: #0a0a0a; min-height: 100vh; color: #f0ede8; padding: 32px 24px 60px; }
  .sc-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .sc-inner { max-width: 560px; margin: 0 auto; }
  .sc-header { margin-bottom: 32px; animation: fadeUp 0.4s ease both; }
  .sc-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a84c; margin-bottom: 8px; }
  .sc-title { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; }
  .sc-sub { font-size: 0.88rem; color: #8a8fa8; margin-top: 6px; }
  .score-visual {
    background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03));
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 16px; padding: 28px; margin-bottom: 24px; text-align: center;
    animation: fadeUp 0.4s 0.1s ease both;
  }
  .score-display {
    font-family: 'Syne', sans-serif; font-size: 5rem; font-weight: 800; line-height: 1;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .score-unit { font-size: 1rem; color: #8a8fa8; margin-top: 4px; }
  .score-range { display: flex; align-items: center; justify-content: space-between; margin-top: 16px; font-size: 0.78rem; color: #4a4f66; }
  .range-bar { flex: 1; height: 4px; background: rgba(255,255,255,0.07); border-radius: 2px; margin: 0 12px; overflow: hidden; }
  .range-fill { height: 100%; background: linear-gradient(90deg, #c9a84c, #e8c96a); border-radius: 2px; transition: width 0.3s; }
  .form-card {
    background: #161920; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; padding: 28px;
    animation: fadeUp 0.4s 0.15s ease both;
  }
  .field-group { margin-bottom: 20px; }
  .field-label { display: block; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: #8a8fa8; margin-bottom: 7px; }
  .field-hint { font-size: 0.75rem; color: #4a4f66; margin-top: 5px; }
  .field {
    width: 100%; background: #1c2030; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 9px; color: #f0ede8; font-family: 'DM Sans', sans-serif;
    font-size: 1rem; padding: 13px 16px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
  .field::placeholder { color: #4a4f66; }
  .field[type="number"] { font-size: 1.4rem; font-weight: 700; text-align: center; font-family: 'Syne', sans-serif; padding: 16px; }
  .field[type="date"] { color-scheme: dark; }
  .btn-submit {
    width: 100%; background: linear-gradient(135deg, #c9a84c, #e8c96a);
    color: #0a0a0a; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.95rem; letter-spacing: 0.04em; padding: 14px; border-radius: 9px;
    border: none; cursor: pointer; transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 24px rgba(201,168,76,0.15);
  }
  .btn-submit:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 0 32px rgba(201,168,76,0.3); }
  .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .rules-card {
    background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.15);
    border-radius: 12px; padding: 16px 18px; margin-top: 16px;
    animation: fadeUp 0.4s 0.25s ease both;
  }
  .rules-title { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #3b82f6; margin-bottom: 10px; }
  .rule-item { display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; color: #8a8fa8; margin-bottom: 6px; }
  .rule-item:last-child { margin-bottom: 0; }
  .rule-dot { color: #3b82f6; flex-shrink: 0; margin-top: 1px; }
  .toast {
    position: fixed; bottom: 32px; right: 24px; z-index: 200;
    background: #1c2030; border: 1px solid rgba(34,197,94,0.3);
    border-radius: 12px; padding: 16px 20px;
    display: flex; align-items: center; gap: 10px;
    font-size: 0.88rem; color: #f0ede8;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: slideIn 0.3s ease, fadeOut 0.3s 2.5s ease forwards;
  }
  .toast-icon { font-size: 1.2rem; }
  .toast-err { border-color: rgba(239,68,68,0.3); }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:none; } }
  @keyframes fadeOut { from { opacity:1; } to { opacity:0; } }
`;

export default function Score() {
  const [form, setForm] = useState({ score: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.score || Number(form.score) < 1 || Number(form.score) > 45) {
      return showToast("Score must be between 1 and 45", true);
    }
    setLoading(true);
    const res = await fetch("https://golfbackend-lb1p.onrender.com/api/scores/add", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ score: Number(form.score), date: form.date })
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) { showToast("Score added successfully!"); setForm({ score: "", date: "" }); }
    else showToast(data.error || "Failed to add score", true);
  };

  const pct = form.score ? Math.min(100, Math.max(0, ((Number(form.score) - 1) / 44) * 100)) : 0;

  return (
    <div className="sc-root">
      <style>{S}</style>
      <div className="sc-inner">

        <div className="sc-header">
          <p className="sc-eyebrow">Score Entry</p>
          <h1 className="sc-title">Log Your Round</h1>
          <p className="sc-sub">Enter your Stableford score. Only the latest 5 scores are kept.</p>
        </div>

        <div className="score-visual">
          <div className="score-display">{form.score || "–"}</div>
          <div className="score-unit">Stableford Points</div>
          <div className="score-range">
            <span>1</span>
            <div className="range-bar">
              <div className="range-fill" style={{ width: `${pct}%` }} />
            </div>
            <span>45</span>
          </div>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label">Stableford Score</label>
              <input
                className="field" type="number" min="1" max="45"
                placeholder="28" value={form.score}
                onChange={e => setForm({ ...form, score: e.target.value })}
                required
              />
              <div className="field-hint">Valid range: 1 – 45 points</div>
            </div>

            <div className="field-group">
              <label className="field-label">Date Played</label>
              <input
                className="field" type="date"
                value={form.date}
                max={new Date().toISOString().split("T")[0]}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
              />
              <div className="field-hint">One score per date. Existing entries can be edited.</div>
            </div>

            <button className="btn-submit" disabled={loading}>
              {loading ? "Submitting…" : "Submit Score →"}
            </button>
          </form>
        </div>

        <div className="rules-card">
          <div className="rules-title">Score Rules</div>
          {[
            "Only the latest 5 scores are retained",
            "A new score automatically replaces the oldest",
            "One score per date — duplicates are not allowed",
            "Scores displayed in reverse chronological order",
          ].map(r => (
            <div className="rule-item" key={r}>
              <span className="rule-dot">→</span> {r}
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className={`toast ${toast.err ? "toast-err" : ""}`}>
          <span className="toast-icon">{toast.err ? "⚠" : "✓"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
