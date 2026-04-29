import { Link } from "react-router-dom";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

  .hp-root {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0a;
    color: #f0ede8;
    overflow-x: hidden;
  }
  .hp-root * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    text-align: center;
    padding: 120px 24px 80px;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.13) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 20% 80%, rgba(34,197,94,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 40% 30% at 80% 60%, rgba(59,130,246,0.04) 0%, transparent 50%);
  }
  .hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%);
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%);
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.25);
    border-radius: 24px;
    padding: 6px 16px;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 28px;
    animation: fadeUp 0.6s 0.1s both ease;
  }
  .hero-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    max-width: 800px;
    animation: fadeUp 0.6s 0.2s both ease;
  }
  .hero-title-gold { color: #c9a84c; }
  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #8a8fa8;
    max-width: 520px;
    line-height: 1.7;
    margin: 24px auto 40px;
    font-weight: 300;
    animation: fadeUp 0.6s 0.3s both ease;
  }
  .hero-cta {
    display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
    animation: fadeUp 0.6s 0.4s both ease;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    color: #0a0a0a;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.95rem; letter-spacing: 0.03em;
    padding: 15px 32px; border-radius: 10px; border: none;
    text-decoration: none; cursor: pointer;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 30px rgba(201,168,76,0.2);
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 0 40px rgba(201,168,76,0.35); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.05);
    color: #f0ede8;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: 0.95rem;
    padding: 14px 28px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    text-decoration: none; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); }

  /* ── STATS STRIP ── */
  .stats-strip {
    display: flex; align-items: center; justify-content: center;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.07);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02);
    flex-wrap: wrap;
  }
  .stat-item {
    flex: 1; min-width: 160px;
    padding: 28px 24px;
    text-align: center;
    border-right: 1px solid rgba(255,255,255,0.07);
  }
  .stat-item:last-child { border-right: none; }
  .stat-number {
    font-family: 'Syne', sans-serif;
    font-size: 2rem; font-weight: 800;
    color: #c9a84c; line-height: 1;
  }
  .stat-label { font-size: 0.82rem; color: #8a8fa8; margin-top: 6px; }

  /* ── HOW IT WORKS ── */
  .section { padding: 100px 24px; max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: #c9a84c; margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800; letter-spacing: -0.02em; line-height: 1.1;
    margin-bottom: 16px;
  }
  .section-sub { color: #8a8fa8; font-size: 1rem; max-width: 480px; line-height: 1.7; }

  .steps-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px; margin-top: 56px;
  }
  .step-card {
    background: #1c2030; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; padding: 28px;
    position: relative; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
  }
  .step-card:hover { border-color: rgba(201,168,76,0.25); transform: translateY(-3px); }
  .step-num {
    font-family: 'Syne', sans-serif;
    font-size: 3rem; font-weight: 800;
    color: rgba(201,168,76,0.12);
    line-height: 1; margin-bottom: 16px;
  }
  .step-icon { font-size: 1.8rem; margin-bottom: 12px; display: block; }
  .step-title { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; margin-bottom: 8px; }
  .step-desc { color: #8a8fa8; font-size: 0.88rem; line-height: 1.65; }

  /* ── PRIZE TIERS ── */
  .prizes-section {
    background: #0f1117;
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .prizes-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px; margin-top: 56px;
  }
  .prize-card {
    border-radius: 16px; padding: 28px 24px;
    text-align: center; border: 1px solid;
    position: relative; overflow: hidden;
    transition: transform 0.2s;
  }
  .prize-card:hover { transform: translateY(-3px); }
  .prize-card.gold-tier { background: rgba(201,168,76,0.06); border-color: rgba(201,168,76,0.3); }
  .prize-card.silver-tier { background: rgba(148,163,184,0.04); border-color: rgba(148,163,184,0.2); }
  .prize-card.bronze-tier { background: rgba(180,120,60,0.04); border-color: rgba(180,120,60,0.2); }
  .prize-match {
    font-family: 'Syne', sans-serif; font-size: 0.8rem;
    font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 12px;
  }
  .prize-pct {
    font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800; line-height: 1;
  }
  .prize-desc { font-size: 0.82rem; color: #8a8fa8; margin-top: 10px; }
  .jackpot-badge {
    display: inline-block; background: rgba(201,168,76,0.15);
    border: 1px solid rgba(201,168,76,0.3);
    color: #c9a84c; font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 12px; margin-top: 10px;
  }

  /* ── CHARITY ── */
  .charity-section { padding: 100px 24px; }
  .charity-inner {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
  }
  .charity-visual {
    background: #1c2030; border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px; padding: 40px;
    position: relative; overflow: hidden;
  }
  .charity-visual::before {
    content: '';
    position: absolute; top: -40px; right: -40px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%);
  }
  .charity-meter { margin-top: 24px; }
  .meter-label { display: flex; justify-content: space-between; font-size: 0.82rem; color: #8a8fa8; margin-bottom: 8px; }
  .meter-track { height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
  .meter-fill {
    height: 100%; border-radius: 4px;
    background: linear-gradient(90deg, #22c55e, #4ade80);
    animation: fillBar 1.5s 0.5s both ease-out;
  }
  @keyframes fillBar { from { width: 0; } to { width: var(--w); } }
  .charity-big-num {
    font-family: 'Syne', sans-serif; font-size: 3.5rem; font-weight: 800;
    color: #22c55e; line-height: 1;
  }

  /* ── CTA ── */
  .cta-section {
    padding: 80px 24px 120px;
    text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-section::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
  .cta-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800; letter-spacing: -0.02em; line-height: 1.1;
    max-width: 600px; margin: 0 auto 16px;
  }
  .cta-sub { color: #8a8fa8; font-size: 1rem; margin-bottom: 36px; }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 40px 32px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
    max-width: 1200px; margin: 0 auto;
  }
  .footer-brand {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1rem; color: #f0ede8;
  }
  .footer-copy { font-size: 0.82rem; color: #4a4f66; }
  .footer-links { display: flex; gap: 20px; }
  .footer-link { font-size: 0.82rem; color: #4a4f66; text-decoration: none; transition: color 0.2s; }
  .footer-link:hover { color: #8a8fa8; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .charity-inner { grid-template-columns: 1fr; gap: 40px; }
    .stat-item { min-width: 50%; }
    .hero { padding: 100px 20px 60px; }
  }
`;

export default function Homepage() {
  return (
    <div className="hp-root">
      <style>{S}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div className="hero-eyebrow">
          <span>⛳</span> Golf · Draw · Give
        </div>

        <h1 className="hero-title">
          Play Golf.<br />
          Win Big.<br />
          <span className="hero-title-gold">Change Lives.</span>
        </h1>

        <p className="hero-sub">
          Enter your Stableford scores, compete in monthly draws, and automatically
          support a charity you believe in — all in one platform.
        </p>

        <div className="hero-cta">
          <Link to="/signup" className="btn-primary">
            Start Playing →
          </Link>
          <Link to="/login" className="btn-secondary">
            Sign In
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-strip">
        {[
          { n: "₹40K+", l: "Monthly Prize Pool" },
          { n: "500+", l: "Active Players" },
          { n: "12",   l: "Charity Partners" },
          { n: "3×",   l: "Match Tiers" },
        ].map(s => (
          <div className="stat-item" key={s.l}>
            <div className="stat-number">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="section">
        <p className="section-label">How it works</p>
        <h2 className="section-title">Simple to play.<br />Meaningful to win.</h2>
        <p className="section-sub">Three steps between you and the draw — and every subscription makes a difference.</p>

        <div className="steps-grid">
          {[
            { n: "01", icon: "💳", t: "Subscribe", d: "Choose a monthly or yearly plan. A portion of your subscription automatically goes to your chosen charity." },
            { n: "02", icon: "🏌️", t: "Enter Scores", d: "Log your last 5 Stableford scores. Only one score per date. The platform keeps a rolling record." },
            { n: "03", icon: "🎯", t: "Enter the Draw", d: "Your scores are automatically entered into the monthly draw. Match 3, 4, or 5 numbers to win." },
            { n: "04", icon: "❤️", t: "Give Back", d: "Every subscription contributes at least 10% to your chosen charity. Increase your share whenever you like." },
          ].map(s => (
            <div className="step-card" key={s.n}>
              <div className="step-num">{s.n}</div>
              <span className="step-icon">{s.icon}</span>
              <div className="step-title">{s.t}</div>
              <div className="step-desc">{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRIZES ── */}
      <div className="prizes-section">
        <div className="section">
          <p className="section-label">Prize Pool</p>
          <h2 className="section-title">Three ways to win.<br />Every month.</h2>
          <p className="section-sub">Draw pool is automatically calculated from active subscribers. Jackpot rolls over if unclaimed.</p>

          <div className="prizes-grid">
            <div className="prize-card gold-tier">
              <div className="prize-match" style={{ color: "#c9a84c" }}>5-Number Match</div>
              <div className="prize-pct" style={{ color: "#c9a84c" }}>40%</div>
              <div className="prize-desc">of the total monthly prize pool</div>
              <div className="jackpot-badge">Jackpot Rollover</div>
            </div>
            <div className="prize-card silver-tier">
              <div className="prize-match" style={{ color: "#94a3b8" }}>4-Number Match</div>
              <div className="prize-pct" style={{ color: "#94a3b8" }}>35%</div>
              <div className="prize-desc">of the total monthly prize pool</div>
            </div>
            <div className="prize-card bronze-tier">
              <div className="prize-match" style={{ color: "#b4783c" }}>3-Number Match</div>
              <div className="prize-pct" style={{ color: "#b4783c" }}>25%</div>
              <div className="prize-desc">of the total monthly prize pool</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CHARITY ── */}
      <div className="charity-section">
        <div className="charity-inner">
          <div>
            <p className="section-label">Charity Impact</p>
            <h2 className="section-title">Every subscription<br />does good.</h2>
            <p className="section-sub" style={{ marginTop: 16 }}>
              Choose from our directory of verified charities. A minimum of 10% of your
              subscription goes directly to your chosen cause — you can always give more.
            </p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              {["Children's education funds", "Environmental conservation", "Sports & wellness programmes"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: "#8a8fa8" }}>
                  <span style={{ color: "#22c55e", fontSize: "1rem" }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="charity-visual">
            <div style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22c55e", marginBottom: 8 }}>This Month's Impact</div>
            <div className="charity-big-num">₹12,400</div>
            <div style={{ fontSize: "0.85rem", color: "#8a8fa8", marginTop: 6 }}>distributed across 12 charities</div>
            <div className="charity-meter">
              {[
                { name: "Bright Futures Foundation", pct: 74 },
                { name: "Green Earth Initiative",    pct: 52 },
                { name: "Sports for All Trust",      pct: 38 },
              ].map(c => (
                <div key={c.name} style={{ marginTop: 20 }}>
                  <div className="meter-label"><span>{c.name}</span><span style={{ color: "#22c55e" }}>{c.pct}%</span></div>
                  <div className="meter-track">
                    <div className="meter-fill" style={{ "--w": `${c.pct}%`, width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-section">
        <h2 className="cta-title">Ready to play, win,<br />and give?</h2>
        <p className="cta-sub">Join hundreds of golfers already on the platform.</p>
        <Link to="/signup" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px" }}>
          Create Free Account →
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "40px 32px" }}>
        <div className="footer">
          <div>
            <div className="footer-brand">⛳ GolfDraw</div>
            <div className="footer-copy" style={{ marginTop: 6 }}>Play. Win. Give Back.</div>
          </div>
          <div className="footer-links">
            <Link to="/signup" className="footer-link">Get Started</Link>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
