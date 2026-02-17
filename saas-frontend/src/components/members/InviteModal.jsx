import { useState } from "react";
import { inviteMember } from "../../api/members";

export default function InviteModal({ open, onClose, onInvited }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleInvite = async () => {
    setLoading(true);
    try {
      const res = await inviteMember(email, role);

      const inviteUrl = `${window.location.origin}/join/${res.token}`;
      setLink(inviteUrl);

      onInvited(); // refresh members list
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(link);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[420px] bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">

        <h2 className="text-lg font-semibold">Invite Member</h2>

        {!link ? (
          <>
            <input
              className="w-full border px-3 py-2 rounded bg-transparent"
              placeholder="Email address"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />

            <select
              className="w-full border px-3 py-2 rounded bg-transparent"
              value={role}
              onChange={e=>setRole(e.target.value)}
            >
              <option value="MEMBER">MEMBER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <button
              onClick={handleInvite}
              disabled={loading || !email}
              className="w-full py-2 rounded-xl bg-[var(--primary)] text-white disabled:opacity-40"
            >
              {loading ? "Creating..." : "Generate Invite Link"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm opacity-70">
              Share this link with the user
            </p>

            <div className="flex gap-2">
              <input
                value={link}
                readOnly
                className="flex-1 border px-3 py-2 rounded bg-transparent text-xs"
              />

              <button
                onClick={copy}
                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white"
              >
                Copy
              </button>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="text-sm opacity-70 hover:opacity-100"
        >
          Close
        </button>

      </div>
    </div>
  );
}
