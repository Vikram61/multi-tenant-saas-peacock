import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { updateProfile } from "../api/settings";
import { changePassword } from "../api/settings";


export default function Settings() {
const { user, setUser, org, permissions } = useAuth();

const [name, setName] = useState(user.name);
const [saving, setSaving] = useState(false);

const dirty = name !== user.name;

const handleSaveProfile = async () => {
  try {
    setSaving(true);
    const updated = await updateProfile({ name });
    console.log(setUser)
    setUser(prev => ({
      ...prev,
      name: updated.name
    }));

  } finally {
    setSaving(false);
  }
};

  if (!user || !org) return null;

  return (
    <div className="max-w-4xl space-y-10">

      <h1 className="text-3xl font-semibold">Settings</h1>

      {/* PROFILE */}
      <Section title="Profile">

        <div className="space-y-4">

          <Field label="Email">
            <input
              value={user.email}
              disabled
              className="input disabled"
            />
          </Field>

          <Field label="Full Name">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="input"
            />
          </Field>

          <button
            disabled={!dirty || saving}
            onClick={handleSaveProfile}
            className="px-5 py-2 rounded-lg bg-[var(--primary)] text-white disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </Section>


      {/* WORKSPACE */}
      {permissions?.canManageMembers && (
        <Section title="Workspace">
          <p className="opacity-70">Organization configuration</p>
        </Section>
      )}

      {/* SECURITY */}
      <Section title="Security">
        <PasswordForm/>
      </Section>

    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm opacity-70">{label}</label>
      {children}
    </div>
  );
}

function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = async () => {
    try {
      setSaving(true);
      await changePassword({
        currentPassword: current,
        newPassword: next
      });
      setDone(true);
      setCurrent("");
      setNext("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">

      <Field label="Current Password">
        <input
          type="password"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          className="input"
        />
      </Field>

      <Field label="New Password">
        <input
          type="password"
          value={next}
          onChange={e => setNext(e.target.value)}
          className="input"
        />
      </Field>

      <button
        disabled={!current || !next || saving}
        onClick={handleChange}
        className="px-5 py-2 rounded-lg bg-[var(--primary)] text-white disabled:opacity-40"
      >
        {saving ? "Updating..." : "Change Password"}
      </button>

      {done && (
        <p className="text-green-500 text-sm">
          Password updated successfully
        </p>
      )}

    </div>
  );
}
