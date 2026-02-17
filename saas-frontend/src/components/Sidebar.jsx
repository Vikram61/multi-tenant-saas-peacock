import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useLayout } from "../context/LayoutContext";

const navItem =
  "block px-4 py-3 rounded-lg hover:bg-[var(--card)] transition";

const active =
  "bg-[var(--card)] border border-[var(--border)] shadow";

export default function Sidebar() {
  const { sidebarOpen, closeSidebar } = useLayout();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          x: window.innerWidth >= 1024 ? 0 : (sidebarOpen ? 0 : -260)
        }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed lg:static z-40 w-64 h-screen bg-[var(--bg)] border-r border-[var(--border)] p-4"
      >
        <h1 className="text-xl font-semibold mb-6 text-[var(--primary)]">
          SaaS Workspace
        </h1>

        <nav className="space-y-2">
          <NavLink to="/" end className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}>
            Dashboard
          </NavLink>

          <NavLink to="/projects" className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}>
            Projects
          </NavLink>

          <NavLink to="/members" className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}>
            Members
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}>
            Settings
          </NavLink>

          <NavLink to="/upgrade" className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}>
            Upgrade
          </NavLink>
        </nav>
      </motion.aside>
    </>
  );
}
