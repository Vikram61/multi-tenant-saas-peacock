import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchMembers } from "../api/members";
import { fetchProjects } from "../api/projects";

const PLAN_LIMITS = {
  FREE: { members: 3, projects: 5 },
  PRO: { members: 20, projects: Infinity },
  TEAM: { members: Infinity, projects: Infinity }
};

export default function Dashboard() {
  const { user, org } = useAuth();

  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [m, p] = await Promise.all([
          fetchMembers(),
          fetchProjects()
        ]);
        setMembers(m);
        setProjects(p);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading || !org || !user) return null;

  const limits = PLAN_LIMITS[org.plan];
  const memberUsage = `${members.length} / ${limits.members === Infinity ? "∞" : limits.members}`;
  const projectUsage = `${projects.length} / ${limits.projects === Infinity ? "∞" : limits.projects}`;

  const usagePercent = Math.min(
    100,
    Math.round(
      (projects.length / (limits.projects === Infinity ? projects.length || 1 : limits.projects)) * 100
    )
  );

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Welcome back, {user.name}</h1>
        <p className="opacity-70 mt-1">
          Organization: <b>{org.name}</b> • Plan: <b>{org.plan}</b>
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        <Card title="Members" value={memberUsage} />
        <Card title="Projects" value={projectUsage} />
        <Card title="Usage" value={`${usagePercent}%`} />

      </div>

      {/* RECENT PROJECTS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>

        {projects.length === 0 ? (
  <div className="border border-dashed p-10 rounded-2xl text-center bg-[var(--card)]">
    <h3 className="text-xl font-semibold mb-2">Create your first project</h3>
    <p className="opacity-70 mb-6">
      Projects help your team organize work inside this workspace
    </p>

    <button
      onClick={() => window.location.href="/projects"}
      className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white"
    >
      Create Project
    </button>
  </div>
        ) : (
          <div className="space-y-3">
            {projects.slice(0,5).map(p => (
              <div
                key={p._id}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]"
              >
                {p.name}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <p className="opacity-70">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
