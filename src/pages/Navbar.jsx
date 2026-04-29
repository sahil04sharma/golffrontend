import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = getToken();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const role = localStorage.getItem("role");
  const dashboardRoute = role === "admin" ? "/admin" : "/dashboard";

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/score", label: "Scores" },
    { to: "/charity", label: "Charity" },
    { to: "/winners", label: "Winnings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0 32px;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .navbar-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .logo-icon {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #c9a84c, #e8c96a);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: #f0ede8;
          letter-spacing: -0.02em;
        }
        .logo-dot { color: #c9a84c; }
        .nav-links {
          display: flex; align-items: center; gap: 4px;
          list-style: none;
        }
        .nav-link {
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: #8a8fa8;
          padding: 7px 14px;
          border-radius: 8px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover { color: #f0ede8; background: rgba(255,255,255,0.06); }
        .nav-link.active {
          color: #c9a84c;
          background: rgba(201,168,76,0.1);
        }
        .nav-actions { display: flex; align-items: center; gap: 10px; }
        .btn-logout {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #8a8fa8;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 7px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-logout:hover { color: #ef4444; border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.05); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: #8a8fa8; border-radius: 2px;
          transition: all 0.2s;
        }
        .mobile-menu {
          display: none;
          position: fixed; top: 64px; left: 0; right: 0;
          background: #0f1117;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 16px 24px 24px;
          flex-direction: column; gap: 4px; z-index: 99;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          text-decoration: none; color: #8a8fa8;
          font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
          padding: 12px 14px; border-radius: 8px;
          transition: all 0.2s;
        }
        .mobile-link:hover, .mobile-link.active {
          color: #c9a84c; background: rgba(201,168,76,0.08);
        }
        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .nav-links, .nav-actions { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">⛳</div>
          <span className="logo-text">Golf<span className="logo-dot">Draw</span></span>
        </Link>

        {token && role !== "admin" && (
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={`nav-link ${isActive(l.to) ? "active" : ""}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="nav-actions">
          {token ? (
            <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
          ) : (
            <>
              <Link to="/" className="btn-ghost" style={{ textDecoration: "none", padding: "7px 16px", borderRadius: 8, fontSize: "0.85rem", border: "1px solid rgba(255,255,255,0.1)", color: "#8a8fa8", fontFamily: "DM Sans, sans-serif" }}>Log In</Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button className="btn-gold" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>Get Started</button>
              </Link>
            </>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {token && role !== "admin" && (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`mobile-link ${isActive(l.to) ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <button onClick={handleLogout} style={{ marginTop: 8, textAlign: "left", background: "none", border: "none", color: "#ef4444", fontFamily: "DM Sans, sans-serif", fontSize: "0.95rem", padding: "12px 14px", cursor: "pointer" }}>
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}
