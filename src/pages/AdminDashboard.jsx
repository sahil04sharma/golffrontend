import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawRunning, setDrawRunning] = useState(false);
  const [drawSuccess, setDrawSuccess] = useState(false);

  const fetchData = async () => {
    const token = getToken();
    try {
      const [resUsers, resWinners, resDonations] = await Promise.all([
        fetch("https://golfbackend-lb1p.onrender.com/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("https://golfbackend-lb1p.onrender.com/api/admin/winners", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("https://golfbackend-lb1p.onrender.com/api/admin/donations", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const usersData = await resUsers.json();
      const winnersData = await resWinners.json();
      const donationsData = await resDonations.json();
      setUsers(Array.isArray(usersData) ? usersData : []);
      setWinners(Array.isArray(winnersData) ? winnersData : []);
      setDonations(Array.isArray(donationsData) ? donationsData : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const runDraw = async () => {
    setDrawRunning(true);
    const token = getToken();
    try {
      const res = await fetch("https://golfbackend-lb1p.onrender.com/api/admin/draw", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setDrawSuccess(true);
        setTimeout(() => setDrawSuccess(false), 4000);
        fetchData();
      } else {
        alert(data.error || "Draw failed");
      }
    } catch {
      alert("Server error");
    }
    setDrawRunning(false);
  };

  const stats = [
    { label: "Total Members", value: users.length, color: "#60a5fa", icon: "◎" },
    { label: "Total Winners", value: winners.length, color: "#4ade80", icon: "◈" },
    { label: "Active Draws", value: 1, color: "#fb923c", icon: "◉" },
    { label: "System", value: "Online", color: "#4ade80", icon: "●" },
    { label: "Charity Fund", value: `₹${donations.reduce((s, d) => s + Number(d.amount || 0), 0).toLocaleString()}`, color: "#c084fc", icon: "♡" },
  ];

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#08080c", display: "flex",
        alignItems: "center", justifyContent: "center",
        color: "rgba(255,255,255,0.3)", fontFamily: "DM Sans, sans-serif",
      }}>
        Loading admin data…
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .admin-root {
          min-height: 100vh;
          background: #08080c;
          font-family: 'DM Sans', sans-serif;
          padding-top: 68px;
          color: #fff;
        }
        .admin-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }

        /* HEADER */
        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .admin-title-group {}
        .admin-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-g 1.5s infinite;
        }
        @keyframes pulse-g {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .admin-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        /* DRAW BUTTON */
        .draw-btn {
          padding: 14px 28px;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: #08080c;
          border: none;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.01em;
        }
        .draw-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(74,222,128,0.3);
        }
        .draw-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .draw-icon {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        /* SUCCESS */
        .draw-toast {
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.25);
          border-radius: 10px;
          padding: 14px 20px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.875rem;
          color: #4ade80;
          font-weight: 500;
          animation: slide-in 0.3s ease;
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* STAT CARDS */
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 14px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #111118;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 22px 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .stat-card:hover { border-color: rgba(255,255,255,0.1); }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }
        .stat-icon {
          font-size: 0.75rem;
          margin-bottom: 16px;
          display: block;
        }
        .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 8px;
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        /* TABLES */
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .table-section {
          background: #111118;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
        }
        .table-head {
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .table-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
        }
        .table-count {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 3px 10px;
          font-family: 'DM Mono', monospace;
        }

        .user-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
          gap: 12px;
        }
        .user-row:last-child { border-bottom: none; }
        .user-row:hover { background: rgba(255,255,255,0.02); }
        .user-avatar {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(96,165,250,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: #60a5fa;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          flex-shrink: 0;
        }
        .user-email {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .role-badge {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .role-admin { background: rgba(251,146,60,0.1); color: #fb923c; border: 1px solid rgba(251,146,60,0.2); }
        .role-user { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.35); border: 1px solid rgba(255,255,255,0.08); }

        .winner-row {
          padding: 16px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .winner-row:last-child { border-bottom: none; }
        .winner-row:hover { background: rgba(255,255,255,0.02); }
        .winner-row-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .winner-user {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
        }
        .winner-prize {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #4ade80;
        }
        .winner-match {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
        }

        .empty-row {
          padding: 36px;
          text-align: center;
          color: rgba(255,255,255,0.2);
          font-size: 0.85rem;
        }

        @media (max-width: 900px) {
          .admin-stats { grid-template-columns: repeat(2, 1fr); }
          .admin-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) {
          .admin-inner { padding: 32px 16px 60px; }
          .admin-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="admin-root">
        <div className="admin-inner">
          {/* Header */}
          <div className="admin-header">
            <div className="admin-title-group">
              <p className="admin-eyebrow">
                <span className="admin-eyebrow-dot" />
                Admin Panel
              </p>
              <h1 className="admin-title">Control Centre</h1>
            </div>
            <button className="draw-btn" onClick={runDraw} disabled={drawRunning}>
              <span className="draw-icon">⟳</span>
              {drawRunning ? "Running Draw…" : "Run Monthly Draw"}
            </button>
          </div>

          {drawSuccess && (
            <div className="draw-toast">
              <span>✓</span>
              Draw executed successfully — winners have been selected and notified.
            </div>
          )}

          {/* Stats */}
          <div className="admin-stats">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-icon" style={{ color: s.color }}>{s.icon}</span>
                <p className="stat-label">{s.label}</p>
                <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tables */}
          <div className="admin-grid">
            {/* Users */}
            <div className="table-section">
              <div className="table-head">
                <p className="table-title">Members</p>
                <span className="table-count">{users.length}</span>
              </div>
              {users.length === 0 ? (
                <div className="empty-row">No members found</div>
              ) : (
                users.map((u) => (
                  <div className="user-row" key={u.id}>
                    <div className="user-avatar">{u.email?.[0]?.toUpperCase() || "?"}</div>
                    <span className="user-email">{u.email}</span>
                    <span className={`role-badge ${u.role === "admin" ? "role-admin" : "role-user"}`}>
                      {u.role || "user"}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Winners */}
            <div className="table-section">
              <div className="table-head">
                <p className="table-title">Draw Winners</p>
                <span className="table-count">{winners.length}</span>
              </div>
              {winners.length === 0 ? (
                <div className="empty-row">No winners yet — run a draw first</div>
              ) : (
                winners.map((w) => (
                  <div className="winner-row" key={w.id}>
                    <div className="winner-row-top">
                      <span className="winner-user">User #{w.user_id}</span>
                      <span className="winner-prize">₹{Number(w.prize_amount).toLocaleString()}</span>
                    </div>
                    <p className="winner-match">{w.match_count} number match{w.match_count !== 1 ? "es" : ""}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Donations */}
          <div className="table-section" style={{ marginTop: "20px" }}>
            <div className="table-head">
              <p className="table-title">Donations</p>
              <span className="table-count">{donations.length}</span>
            </div>
            {donations.length === 0 ? (
              <div className="empty-row">No donations yet</div>
            ) : (
              donations.map((d, i) => (
                <div className="winner-row" key={i}>
                  <div className="winner-row-top">
                    <span className="winner-user">User #{d.user_id}</span>
                    <span className="winner-prize" style={{ color: "#c084fc" }}>
                      ₹{Number(d.amount).toLocaleString()}
                    </span>
                  </div>
                  <p className="winner-match">♡ {d.charities?.name || "Charity"}</p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}