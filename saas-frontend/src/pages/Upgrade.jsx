import { upgradePlan } from "../api/upgrade";
import { useAuth } from "../context/AuthContext";

const plans = [
  {
    name: "FREE",
    price: "₹0",
    features: ["3 Members", "5 Projects"]
  },
  {
    name: "PRO",
    price: "₹499/mo",
    features: ["20 Members", "Unlimited Projects"]
  },
  {
    name: "TEAM",
    price: "₹999/mo",
    features: ["Unlimited Members", "Analytics Dashboard"]
  }
];

export default function Upgrade() {
  const { org } = useAuth();

  const handleUpgrade = async (plan) => {
    await upgradePlan(plan);
    window.location.reload(); // temporary (later realtime)
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-10">Upgrade Plan</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(p => (
          <div
            key={p.name}
            className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-2xl mt-2">{p.price}</p>

              <ul className="mt-4 space-y-2 opacity-80">
                {p.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
            </div>

            <button
              disabled={org?.plan === p.name}
              onClick={() => handleUpgrade(p.name)}
              className="mt-6 px-4 py-2 rounded-lg bg-[var(--primary)] text-white disabled:opacity-40"
            >
              {org?.plan === p.name ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
