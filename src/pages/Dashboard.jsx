import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";
import { Link } from "react-router-dom";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  .db-root { font-family: 'DM Sans', sans-serif; background: #0a0a0a; min-height: 100vh; color: #f0ede8; padding: 32px 24px 60px; }
  .db-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .db-header { margin-bottom: 32px; animation: fadeUp 0.4s ease both; }
  .db-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a84c; margin-bottom: 8px; }
  .db-title { font-family: 'Syne', sans-serif; font-size: clamp(1.6rem,4vw,2.2rem); font-weight: 800; letter-spacing: -0.02em; }
  .db-sub { font-size: 0.9rem; color: #8a8fa8; margin-top: 6px; }
  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 28px; }
  .stat-card {
    background: #1c2030; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px; padding: 20px 22px;
    position: relative; overflow: hidden;
    animation: fadeUp 0.4s ease both;
  }
  .stat-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--c1), var(--c2));
  }
  .stat-icon { font-size: 1.4rem; margin-bottom: 10px; }
  .stat-label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8a8fa8; margin-bottom: 6px; }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: #f0ede8; }
  .stat-badge {
    display: inline-block; margin-top: 8px;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 20px;
  }
  .actions-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px; margin-bottom: 28px;
  }
  .action-btn {
    display: flex; align-items: center; gap: 10px;
    background: #161920; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; padding: 16px 18px; text-decoration: none;
    color: #f0ede8; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
    transition: all 0.2s; cursor: pointer;
    animation: fadeUp 0.4s ease both;
  }
  .action-btn:hover { background: #1c2030; border-color: rgba(255,255,255,0.16); transform: translateY(-2px); }
  .action-btn.gold { border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.06); }
  .action-btn.gold:hover { background: rgba(201,168,76,0.1); }
  .action-icon { font-size: 1.3rem; flex-shrink: 0; }
  .action-label { font-size: 0.88rem; font-weight: 500; }
  .action-arrow { margin-left: auto; color: #4a4f66; font-size: 0.9rem; }
  .scores-card {
    background: #161920; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; overflow: hidden;
    animation: fadeUp 0.5s ease both;
  }
  .scores-header {
    padding: 20px 24px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
  }
  .scores-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; }
  .scores-link { font-size: 0.82rem; color: #c9a84c; text-decoration: none; }
  .scores-link:hover { text-decoration: underline; }
  .score-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 24px; border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s;
  }
  .score-row:last-child { border-bottom: none; }
  .score-row:hover { background: rgba(255,255,255,0.02); }
  .score-number {
    font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 800;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .score-date { font-size: 0.83rem; color: #8a8fa8; }
  .score-rank {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.78rem; color: #4a4f66;
  }
  .empty-state { padding: 40px 24px; text-align: center; }
  .empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
  .empty-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #f0ede8; margin-bottom: 6px; }
  .empty-sub { font-size: 0.85rem; color: #8a8fa8; margin-bottom: 20px; }
  .btn-gold {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    color: #0a0a0a; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.88rem; letter-spacing: 0.03em;
    padding: 11px 22px; border-radius: 8px; border: none; cursor: pointer;
    text-decoration: none; transition: opacity 0.2s, transform 0.15s;
  }
  .btn-gold:hover { opacity: 0.9; transform: translateY(-1px); }
  .loading { display: flex; align-items: center; justify-content: center; min-height: 200px; color: #8a8fa8; font-size: 0.9rem; gap: 10px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner { width: 18px; height: 18px; border: 2px solid #1c2030; border-top-color: #c9a84c; border-radius: 50%; animation: spin 0.7s linear infinite; }
`;

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = getToken();
      const res = await fetch("https://golfbackend-lb1p.onrender.com/api/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setScores(data.scores || []);
      setSubscription(data.subscription);
      setLoading(false);
    })();
  }, []);

  if (loading) return (
    <div className="db-root">
      <style>{S}</style>
      <div className="loading"><div className="spinner" /> Loading dashboard…</div>
    </div>
  );

  const actions = [
    { to: "/score",        icon: "🏌️", label: "Add Score",      cls: "gold" },
    { to: "/subscription", icon: "💳", label: "Subscription",   cls: "" },
    { to: "/charity",      icon: "❤️", label: "Charity",        cls: "" },
    { to: "/winners",      icon: "🏆", label: "My Winnings",    cls: "" },
  ];

  return (
    <div className="db-root">
      <style>{S}</style>

      <div className="db-header">
        <p className="db-eyebrow">Player Dashboard</p>
        <h1 className="db-title">Play. Win. Give Back.</h1>
        <p className="db-sub">Your performance, draws, and impact — all in one place.</p>
      </div>

      <div className="stats-row">
        <div className="stat-card" style={{ "--c1": "#c9a84c", "--c2": "#e8c96a", animationDelay: "0.05s" }}>
          <div className="stat-icon">💳</div>
          <div className="stat-label">Subscription</div>
          <div className="stat-value">{subscription ? "Active" : "Inactive"}</div>
          <span className="stat-badge" style={subscription
            ? { background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }
            : { background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
            {subscription ? "✓ Enrolled" : "× Not active"}
          </span>
        </div>

        <div className="stat-card" style={{ "--c1": "#3b82f6", "--c2": "#60a5fa", animationDelay: "0.1s" }}>
          <div className="stat-icon">🏌️</div>
          <div className="stat-label">Scores Logged</div>
          <div className="stat-value">{scores.length} / 5</div>
          <span className="stat-badge" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)" }}>
            Rolling record
          </span>
        </div>

        <div className="stat-card" style={{ "--c1": "#22c55e", "--c2": "#4ade80", animationDelay: "0.15s" }}>
          <div className="stat-icon">🎯</div>
          <div className="stat-label">Draw Status</div>
          <div className="stat-value">Ready</div>
          <span className="stat-badge" style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.2)" }}>
            ⚡ Entered
          </span>
        </div>
      </div>

      <div className="actions-grid">
        {actions.map((a, i) => (
          <Link to={a.to} className={`action-btn ${a.cls}`} key={a.to} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
            <span className="action-icon">{a.icon}</span>
            <span className="action-label">{a.label}</span>
            <span className="action-arrow">→</span>
          </Link>
        ))}
      </div>

      <div className="scores-card">
        <div className="scores-header">
          <span className="scores-title">Recent Scores</span>
          <Link to="/score" className="scores-link">+ Add Score</Link>
        </div>

        {scores.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⛳</div>
            <div className="empty-title">No scores yet</div>
            <div className="empty-sub">Log your first Stableford score to enter the monthly draw</div>
            <Link to="/score" className="btn-gold">Add First Score →</Link>
          </div>
        ) : (
          scores.map((s, i) => (
            <div className="score-row" key={s.id}>
              <div>
                <div className="score-number">{s.score} pts</div>
                <div className="score-date">{new Date(s.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
              </div>
              <div className="score-rank">
                <span>#{i + 1} recent</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
