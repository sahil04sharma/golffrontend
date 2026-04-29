import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  .ch-root { font-family: 'DM Sans', sans-serif; background: #0a0a0a; min-height: 100vh; color: #f0ede8; padding: 32px 24px 60px; }
  .ch-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .ch-inner { max-width: 680px; margin: 0 auto; }
  .ch-header { margin-bottom: 32px; animation: fadeUp 0.4s ease both; }
  .ch-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #22c55e; margin-bottom: 8px; }
  .ch-title { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; }
  .ch-sub { font-size: 0.88rem; color: #8a8fa8; margin-top: 6px; line-height: 1.65; }
  .impact-banner {
    background: linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03));
    border: 1px solid rgba(34,197,94,0.2); border-radius: 14px;
    padding: 20px 22px; margin-bottom: 24px;
    display: flex; align-items: center; gap: 16px;
    animation: fadeUp 0.4s 0.1s ease both;
  }
  .impact-icon { font-size: 2rem; flex-shrink: 0; }
  .impact-text { font-size: 0.88rem; color: #8a8fa8; line-height: 1.6; }
  .impact-text strong { color: #22c55e; }
  .charities-grid { display: grid; gap: 10px; margin-bottom: 24px; }
  .charity-option {
    background: #161920; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 16px 18px;
    display: flex; align-items: center; gap: 14px;
    cursor: pointer; transition: all 0.2s;
    animation: fadeUp 0.4s ease both;
  }
  .charity-option:hover { border-color: rgba(34,197,94,0.25); background: #1c2030; }
  .charity-option.selected { border-color: #22c55e; background: rgba(34,197,94,0.06); }
  .radio-circle {
    width: 20px; height: 20px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.2); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .charity-option.selected .radio-circle { border-color: #22c55e; background: #22c55e; }
  .radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #0a0a0a; opacity: 0; transition: opacity 0.2s; }
  .charity-option.selected .radio-dot { opacity: 1; }
  .charity-name { font-size: 0.95rem; font-weight: 500; color: #f0ede8; }
  .charity-tag { font-size: 0.75rem; color: #8a8fa8; margin-top: 2px; }
  .pct-card {
    background: #161920; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; padding: 24px;
    animation: fadeUp 0.4s 0.2s ease both; margin-bottom: 16px;
  }
  .pct-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .pct-label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8fa8; }
  .pct-value {
    font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800;
    color: #22c55e;
  }
  .pct-slider {
    -webkit-appearance: none; width: 100%; height: 6px;
    background: rgba(255,255,255,0.08); border-radius: 3px; outline: none;
    margin-bottom: 10px;
  }
  .pct-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 20px; height: 20px;
    background: linear-gradient(135deg, #22c55e, #4ade80);
    border-radius: 50%; cursor: pointer;
    box-shadow: 0 0 10px rgba(34,197,94,0.4);
  }
  .pct-marks { display: flex; justify-content: space-between; font-size: 0.72rem; color: #4a4f66; }
  .min-badge {
    display: inline-flex; align-items: center; gap: 5px;
    background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2);
    color: #22c55e; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em;
    text-transform: uppercase; padding: 3px 10px; border-radius: 12px;
  }
  .btn-submit {
    width: 100%; background: linear-gradient(135deg, #22c55e, #4ade80);
    color: #0a0a0a; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.95rem; letter-spacing: 0.04em; padding: 14px; border-radius: 9px;
    border: none; cursor: pointer; transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 0 24px rgba(34,197,94,0.15);
    animation: fadeUp 0.4s 0.25s ease both;
  }
  .btn-submit:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .section-label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8a8fa8; margin-bottom: 12px; }
  .toast {
    position: fixed; bottom: 32px; right: 24px; z-index: 200;
    background: #1c2030; border: 1px solid rgba(34,197,94,0.3);
    border-radius: 12px; padding: 14px 18px;
    display: flex; align-items: center; gap: 10px;
    font-size: 0.87rem; color: #f0ede8;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: slideIn 0.3s ease, fadeOut 0.3s 2.5s ease forwards;
  }
  .toast-err { border-color: rgba(239,68,68,0.3); }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:none; } }
  @keyframes fadeOut { from { opacity:1; } to { opacity:0; } }
`;

export default function Charity() {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState("");
  const [percentage, setPercentage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const token = getToken();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/charities", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data)) setCharities(data);
        else if (Array.isArray(data.data)) setCharities(data.data);
        else if (Array.isArray(data.charities)) setCharities(data.charities);
      } catch {}
    })();
  }, []);

  const showToast = (msg, err = false) => { setToast({ msg, err }); setTimeout(() => setToast(null), 3000); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return showToast("Please select a charity", true);
    if (percentage < 10) return showToast("Minimum 10% required", true);
    if (!token) return showToast("Login required", true);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/charities/select", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ charity_id: selected, percentage: Number(percentage) })
      });
      const data = await res.json();
      if (res.ok) showToast("Charity selection saved! ❤️");
      else showToast(data.error || "Error saving selection", true);
    } catch { showToast("Network error", true); }
    setLoading(false);
  };

  return (
    <div className="ch-root">
      <style>{S}</style>
      <div className="ch-inner">

        <div className="ch-header">
          <p className="ch-eyebrow">❤️ Charity</p>
          <h1 className="ch-title">Give Back</h1>
          <p className="ch-sub">Choose a cause you care about. A portion of your subscription goes directly to them — automatically, every month.</p>
        </div>

        <div className="impact-banner">
          <div className="impact-icon">💚</div>
          <div className="impact-text">
            <strong>Minimum 10%</strong> of your subscription supports your chosen charity.
            You can always give more — it's your choice.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {charities.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <p className="section-label">Choose a Charity</p>
              <div className="charities-grid">
                {charities.map((c, i) => (
                  <div
                    key={c.id}
                    className={`charity-option ${selected === c.id ? "selected" : ""}`}
                    style={{ animationDelay: `${0.1 + i * 0.04}s` }}
                    onClick={() => setSelected(c.id)}
                  >
                    <div className="radio-circle"><div className="radio-dot" /></div>
                    <div>
                      <div className="charity-name">{c.name}</div>
                      <div className="charity-tag">{c.category || "Registered Charity"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {charities.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px", background: "#161920", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 24 }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>🔄</div>
              <div style={{ color: "#8a8fa8", fontSize: "0.88rem" }}>Loading charities…</div>
            </div>
          )}

          <div className="pct-card">
            <div className="pct-header">
              <div>
                <div className="pct-label">Contribution Percentage</div>
                <div style={{ fontSize: "0.78rem", color: "#4a4f66", marginTop: 3 }}>How much of your subscription to donate</div>
              </div>
              <div className="pct-value">{percentage}%</div>
            </div>
            <input
              className="pct-slider" type="range" min="10" max="100"
              value={percentage} onChange={e => setPercentage(Number(e.target.value))}
            />
            <div className="pct-marks">
              <span>10% <span className="min-badge">Minimum</span></span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <button className="btn-submit" disabled={loading}>
            {loading ? "Saving…" : "Save Charity Selection →"}
          </button>
        </form>
      </div>

      {toast && (
        <div className={`toast ${toast.err ? "toast-err" : ""}`}>
          <span>{toast.err ? "⚠" : "✓"}</span> {toast.msg}
        </div>
      )}
    </div>
  );
}
