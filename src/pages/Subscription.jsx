import { getToken } from "../utils/auth";
import { useState } from "react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  .sub-root { font-family: 'DM Sans', sans-serif; background: #0a0a0a; min-height: 100vh; color: #f0ede8; padding: 32px 24px 60px; }
  .sub-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .sub-inner { max-width: 700px; margin: 0 auto; }
  .sub-header { margin-bottom: 40px; text-align: center; animation: fadeUp 0.4s ease both; }
  .sub-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a84c; margin-bottom: 8px; }
  .sub-title { font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; letter-spacing: -0.02em; }
  .sub-sub { font-size: 0.9rem; color: #8a8fa8; margin-top: 8px; }
  .plans-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .plan-card {
    background: #161920; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px; padding: 28px; position: relative; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    animation: fadeUp 0.4s ease both;
    cursor: pointer;
  }
  .plan-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
  .plan-card.featured {
    border-color: rgba(201,168,76,0.4);
    background: linear-gradient(160deg, rgba(201,168,76,0.07) 0%, #161920 50%);
  }
  .plan-card.featured::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #c9a84c, #e8c96a);
  }
  .plan-badge {
    display: inline-block; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.3);
    color: #c9a84c; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px;
  }
  .plan-name { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
  .plan-price {
    font-family: 'Syne', sans-serif; font-size: 2.5rem; font-weight: 800; line-height: 1;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .plan-period { font-size: 0.82rem; color: #8a8fa8; margin-top: 4px; margin-bottom: 20px; }
  .plan-features { list-style: none; }
  .plan-feature { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #8a8fa8; margin-bottom: 9px; }
  .feature-check { color: #22c55e; flex-shrink: 0; font-size: 0.9rem; }
  .plan-cta {
    display: block; width: 100%; margin-top: 24px;
    background: linear-gradient(135deg, #c9a84c, #e8c96a);
    color: #0a0a0a; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.9rem; letter-spacing: 0.04em; padding: 13px; border-radius: 9px;
    border: none; cursor: pointer; transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 0 20px rgba(201,168,76,0.15);
  }
  .plan-cta:hover { opacity: 0.9; transform: translateY(-1px); }
  .plan-cta:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .plan-cta-ghost {
    display: block; width: 100%; margin-top: 24px;
    background: rgba(255,255,255,0.05); color: #f0ede8;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.9rem; letter-spacing: 0.04em; padding: 13px; border-radius: 9px;
    border: 1px solid rgba(255,255,255,0.1); cursor: pointer;
    transition: all 0.2s;
  }
  .plan-cta-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); }
  .plan-cta-ghost:disabled { opacity: 0.5; cursor: not-allowed; }
  .savings-tag {
    text-align: center; font-size: 0.82rem; color: #22c55e;
    background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.15);
    border-radius: 8px; padding: 10px 16px;
    animation: fadeUp 0.4s 0.2s ease both;
  }
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
  @media (max-width: 500px) { .plans-grid { grid-template-columns: 1fr; } }
`;

export default function Subscription() {
  const [loading, setLoading] = useState("");
  const [toast, setToast] = useState(null);
  const [currentSub, setCurrentSub] = useState(null);

  const showToast = (msg, err = false) => { setToast({ msg, err }); setTimeout(() => setToast(null), 3000); };

  

  const handleSubscribe = async (plan) => {
    try {
      setLoading(plan);

      // 💰 Set amount based on plan
      const amount = plan === "monthly" ? 100 : 1000;

      // 1️⃣ Create Razorpay order
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
      });

      const order = await res.json();

      if (!order.id) {
        setLoading("");
        showToast("Failed to initiate payment", true);
        return;
      }

      

      // 2️⃣ Open Razorpay
      const options = {
        key: "rzp_test_SjMDmYWBwNxOoX", // this is hardcore but this is not a good practice to use real key here but for testing purpose we can use this
        amount: order.amount,
        currency: "INR",
        name: "GolfDraw",
        description: `${plan} subscription`,
        order_id: order.id,

        handler: async function (response) {

          // 3️⃣ Verify payment
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ...response,
                user_id: localStorage.getItem("userId"),
              }),
            }
          );

          const data = await verifyRes.json();

          if (verifyRes.ok) {
            showToast(
              `${plan === "monthly" ? "Monthly" : "Yearly"} subscription activated! 🎉`
            );
          } else {
            showToast(data.error || "Payment verification failed", true);
          }

          setLoading("");
        },

        modal: {
          ondismiss: function () {
            setLoading("");
            showToast("Payment cancelled", true);
          }
        },

        theme: {
          color: "#c9a84c",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      setLoading("");
      showToast("Payment failed", true);
    }
  };

  const features = [
    "Monthly draw entry included",
    "Stableford score tracking",
    "Charity contribution (10% min)",
    "Winner verification access",
  ];

  return (
    <div className="sub-root">
      <style>{S}</style>
      <div className="sub-inner">

        <div className="sub-header">
          <p className="sub-eyebrow">Pricing</p>
          <h1 className="sub-title">Choose Your Plan</h1>
          <p className="sub-sub">Every plan includes monthly draw entry and charity contribution.</p>
        </div>

        <div className="plans-grid">
          {/* Monthly */}
          <div className="plan-card" style={{ animationDelay: "0.05s" }}>
            <div className="plan-name">Monthly</div>
            <div className="plan-price">₹100</div>
            <div className="plan-period">per month · billed monthly</div>
            <ul className="plan-features">
              {features.map(f => (
                <li className="plan-feature" key={f}><span className="feature-check">✓</span>{f}</li>
              ))}
            </ul>
            <button className="plan-cta-ghost" onClick={() => handleSubscribe("monthly")} disabled={!!loading}>
              {loading === "monthly" ? "Processing…" : "Get Monthly"}
            </button>
          </div>

          {/* Yearly */}
          <div className="plan-card featured" style={{ animationDelay: "0.1s" }}>
            <div className="plan-badge">⚡ Best Value</div>
            <div className="plan-name">Yearly</div>
            <div className="plan-price">₹1,000</div>
            <div className="plan-period">per year · save ₹200</div>
            <ul className="plan-features">
              {features.map(f => (
                <li className="plan-feature" key={f}><span className="feature-check">✓</span>{f}</li>
              ))}
              <li className="plan-feature"><span className="feature-check">✓</span><strong style={{ color: "#c9a84c" }}>2 months free</strong></li>
            </ul>
            <button className="plan-cta" onClick={() => handleSubscribe("yearly")} disabled={!!loading}>
              {loading === "yearly" ? "Processing…" : "Get Yearly →"}
            </button>
          </div>
        </div>

        <div className="savings-tag">
          💡 Yearly plan saves you ₹200 — that's 2 months free. Charity contributions included in both plans.
        </div>
      </div>

      {toast && (
        <div className={`toast ${toast.err ? "toast-err" : ""}`}>
          <span>{toast.err ? "⚠" : "✓"}</span> {toast.msg}
        </div>
      )}
    </div>
  );
}
