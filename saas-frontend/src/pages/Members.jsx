import { useEffect, useState } from "react";
import { fetchMembers, inviteMember } from "../api/members";
import { useAuth } from "../context/AuthContext";
import { updateMemberRole, removeMember } from "../api/members";
import InviteModal from "../components/members/InviteModal";

const Members=()=> {
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [showInvite, setShowInvite] = useState(false);

const { user, permissions } = useAuth();

const isOwner = user?.role === "OWNER";
const canManage = user?.role === "OWNER" || user?.role === "ADMIN";
const handleRoleChange = async (id, newRole) => {
  await updateMemberRole(id, newRole);
  fetchMembers().then(setMembers);
};

const handleRemove = async (id) => {
  if (!window.confirm("Remove this member?")) return;
  await removeMember(id);
  fetchMembers().then(setMembers);
};

  useEffect(() => {
    fetchMembers().then(setMembers);
  }, []);

  const handleInvite = async () => {
    const res = await inviteMember(email, role);
   const inviteUrl = `${window.location.origin}/join/${res.token}`;
await navigator.clipboard.writeText(inviteUrl);
alert("Invite link copied:\n" + inviteUrl);

    setEmail("");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Members</h2>

      {/* invite */}
  {permissions?.canInvite && (
  <button
    onClick={()=>setShowInvite(true)}
    className="mb-6 px-4 py-2 rounded-lg bg-[var(--primary)] text-white"
  >
    Invite Member
  </button>
)}



      {/* members list */}
<div className="space-y-3">
  {members.map(m => (
    <div
      key={m._id}
      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] flex items-center justify-between"
    >

      {/* identity */}
      <div>
        <div className="font-medium">{m.name || "No name"}</div>
        <div className="text-sm opacity-70">{m.email}</div>
      </div>

      {/* role */}
      <div className="flex items-center gap-4">

        {canManage && m.role !== "OWNER" ? (
          <select
            value={m.role}
            onChange={(e)=>handleRoleChange(m._id, e.target.value)}
            className="border px-2 py-1 rounded bg-transparent"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MEMBER">MEMBER</option>
          </select>
        ) : (
          <span className="px-2 py-1 text-xs rounded bg-[var(--border)]">
            {m.role}
          </span>
        )}

        {/* remove */}
        {isOwner && m.role !== "OWNER" && m._id !== user._id && (
          <button
            onClick={()=>handleRemove(m._id)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        )}

      </div>
    </div>
  ))}
</div>

    </div>
  );
}
export default Members;