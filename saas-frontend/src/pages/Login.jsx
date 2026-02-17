import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../api/auth";
import { refreshAccessToken } from "../api/refresh";

export default function Login() {

  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // STEP 1 → backend sets refresh cookie
      await loginUser(form.email, form.password);

      // STEP 2 → obtain access token from cookie
      await refreshAccessToken();

      // STEP 3 → reload app session
      window.location.href = "/";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">

      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="w-full max-w-md">

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-xl">

          <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-[var(--muted)] mb-6">Login to your workspace</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input name="email" type="email" required placeholder="Email"
              value={form.email} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]" />

            <input name="password" type="password" required placeholder="Password"
              value={form.password} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]" />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              disabled={loading}
              className="w-full py-2 rounded-lg bg-[var(--primary)] text-white"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
