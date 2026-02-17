import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organizationName: ""
  });

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(form);

      alert("Workspace created! Please login.");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <form
        onSubmit={handleSubmit}
        className="w-[420px] p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center">
          Create Workspace
        </h1>

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-transparent"
          required
        />

        <input
          name="organizationName"
          placeholder="Workspace Name"
          value={form.organizationName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-transparent"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-transparent"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-transparent"
          required
        />

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-[var(--primary)] text-white"
        >
          {loading ? "Creating..." : "Create Workspace"}
        </button>

        <p className="text-sm text-center opacity-70">
          Already have a workspace?{" "}
          <Link to="/login" className="underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
