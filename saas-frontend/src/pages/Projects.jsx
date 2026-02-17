import { useEffect, useState } from "react";
import { fetchProjects, createProject } from "../api/projects";
import Modal from "../components/Modal";

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects().then(setProjects).catch(console.error);
  }, []);

  const handleCreate = async () => {
    try {
      const newProject = await createProject(form);
      setProjects(prev => [newProject, ...prev]);
      setOpen(false);
      setForm({ name: "", description: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  if (!projects)
    return <div className="opacity-70">Loading projects...</div>;

  return (
    <div>
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white"
        >
          New Project
        </button>
      </div>

      {/* grid */}
      {projects.length === 0 ? (
        <div className="text-center opacity-60 mt-20">
          No projects yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project._id}
              className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="opacity-70 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg font-semibold mb-4">Create Project</h3>

        <input
          placeholder="Project name"
          className="w-full mb-3 p-2 rounded bg-transparent border border-[var(--border)]"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 rounded bg-transparent border border-[var(--border)]"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style = {{resize:"none"}}
        />

        {error && (
          <div className="text-red-400 text-sm mb-2">{error}</div>
        )}

        <button
          onClick={handleCreate}
          className="w-full py-2 rounded bg-[var(--primary)] text-white"
        >
          Create
        </button>
      </Modal>
    </div>
  );
}
