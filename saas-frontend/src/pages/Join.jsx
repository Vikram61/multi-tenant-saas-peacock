import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { joinOrganization } from "../api/join";

const Join = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await joinOrganization({ token, name, password });

      alert("Account created. Please login.");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Invite invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">

      <form
        onSubmit={handleJoin}
        className="w-[380px] p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center">
          Join Workspace
        </h1>

        <input
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded bg-transparent"
          value={name}
          onChange={e=>setName(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          className="w-full border px-3 py-2 rounded bg-transparent"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-[var(--primary)] text-white"
        >
          {loading ? "Creating account..." : "Join Organization"}
        </button>
      </form>
    </div>
  );
};

export default Join;
