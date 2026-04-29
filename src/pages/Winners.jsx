import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  .wn-root { font-family: 'DM Sans', sans-serif; background: #0a0a0a; min-height: 100vh; color: #f0ede8; padding: 32px 24px 60px; }
  .wn-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .wn-inner { max-width: 680px; margin: 0 auto; }
  .wn-header { margin-bottom: 32px; animation: fadeUp 0.4s ease both; }
  .wn-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a84c; margin-bottom: 8px; }
  .wn-title { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; }
  .wn-sub { font-size: 0.88rem; color: #8a8fa8; margin-top: 6px; }
  .win-card {
    background: #161920; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
    animation: fadeUp 0.4s ease both;
    margin-bottom: 12px;
  }
  .win-card:hover { border-color: rgba(255,255,255,0.14); transform: translateY(-2px); }
  .win-card-inner { display: flex; align-items: stretch; }
  .win-accent { width: 4px; flex-shrink: 0; }
  .win-body { flex: 1; padding: 20px 22px; }
  .win-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .win-match { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
  .win-prize {
    font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; line-height: 1;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .win-status-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 20px; flex-shrink: 0;
  }
  .status-approved { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
  .status-pending  { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25); }
  .status-rejected { background: rgba(239,68,68,0.1);  color: #ef4444; border: 1px solid rgba(239,68,68,0.25); }
  .win-meta { display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap; }
  .win-meta-item { font-size: 0.8rem; color: #8a8fa8; display: flex; align-items: center; gap: 5px; }
  .empty-state {
    text-align: center; padding: 60px 24px;
    background: #161920; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    animation: fadeUp 0.4s 0.1s ease both;
  }
  .empty-icon { font-size: 3rem; margin-bottom: 16px; }
  .empty-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; margin-bottom: 8px; }
  .empty-sub { font-size: 0.88rem; color: #8a8fa8; line-height: 1.65; max-width: 320px; margin: 0 auto 24px; }
  .btn-gold {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    color: #0a0a0a; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.88rem; letter-spacing: 0.03em;
    padding: 11px 22px; border-radius: 8px; border: none; cursor: pointer;
    text-decoration: none; transition: opacity 0.2s, transform 0.15s;
  }
  .btn-gold:hover { opacity: 0.9; transform: translateY(-1px); }
  .summary-strip {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px;
    animation: fadeUp 0.4s 0.05s ease both;
  }
  .summary-chip {
    background: #1c2030; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; padding: 14px 16px; text-align: center;
  }
  .chip-val { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 800; color: #f0ede8; }
  .chip-lbl { font-size: 0.74rem; color: #8a8fa8; margin-top: 3px; }
  .loading { display: flex; align-items: center; justify-content: center; min-height: 200px; color: #8a8fa8; font-size: 0.9rem; gap: 10px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  @keyframes spin { to { transform:rotate(360deg); } }
  .spinner { width: 18px; height: 18px; border: 2px solid #1c2030; border-top-color: #c9a84c; border-radius: 50%; animation: spin 0.7s linear infinite; }
`;

const matchColors = { 5: "#c9a84c", 4: "#94a3b8", 3: "#b4783c" };
const statusMeta = {
  approved: { label: "Approved", cls: "status-approved", dot: "✓" },
  pending:  { label: "Pending",  cls: "status-pending",  dot: "⏳" },
  rejected: { label: "Rejected", cls: "status-rejected", dot: "✕" },
};

export default function Winners() {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:5000/api/winners/my", {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await res.json();
      if (res.ok) setWinners(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return (
    <div className="wn-root"><style>{S}</style>
      <div className="loading"><div className="spinner" /> Loading winnings…</div>
    </div>
  );

  const totalWon = winners.filter(w => w.status === "approved").reduce((s, w) => s + Number(w.prize_amount), 0);
  const pending  = winners.filter(w => w.status === "pending").length;

  return (
    <div className="wn-root">
      <style>{S}</style>
      <div className="wn-inner">

        <div className="wn-header">
          <p className="wn-eyebrow">🏆 Winnings</p>
          <h1 className="wn-title">My Winnings</h1>
          <p className="wn-sub">Your draw results, prizes, and verification status.</p>
        </div>

        {winners.length > 0 && (
          <div className="summary-strip">
            <div className="summary-chip">
              <div className="chip-val">{winners.length}</div>
              <div className="chip-lbl">Total Draws Won</div>
            </div>
            <div className="summary-chip">
              <div className="chip-val" style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ₹{totalWon.toLocaleString()}
              </div>
              <div className="chip-lbl">Total Received</div>
            </div>
            <div className="summary-chip">
              <div className="chip-val" style={{ color: "#f59e0b" }}>{pending}</div>
              <div className="chip-lbl">Pending Review</div>
            </div>
          </div>
        )}

        {winners.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <div className="empty-title">No winnings yet</div>
            <div className="empty-sub">Keep entering your scores and participating in monthly draws. Your moment is coming!</div>
            <a href="/score" className="btn-gold">Enter a Score →</a>
          </div>
        ) : (
          winners.map((w, i) => {
            const color = matchColors[w.match_count] || "#8a8fa8";
            const sm = statusMeta[w.status] || statusMeta.pending;
            return (
              <div className="win-card" key={w.id} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                <div className="win-card-inner">
                  <div className="win-accent" style={{ background: color }} />
                  <div className="win-body">
                    <div className="win-top">
                      <div>
                        <div className="win-match">🎯 {w.match_count}-Number Match</div>
                        <div className="win-prize">₹{Number(w.prize_amount).toLocaleString()}</div>
                      </div>
                      <div className={`win-status-badge ${sm.cls}`}>
                        {sm.dot} {sm.label}
                      </div>
                    </div>
                    <div className="win-meta">
                      {w.draw_date && <span className="win-meta-item">📅 {new Date(w.draw_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
                      <span className="win-meta-item">🏅 {w.match_count} of 5 matched</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
