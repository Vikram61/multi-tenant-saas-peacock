import ThemeToggle from './ThemeToggle'
import { useLayout } from '../context/LayoutContext'
import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { toggleSidebar } = useLayout();
  const { user, org, loading } = useAuth();

  if (loading) return null;

  return (
<header className="h-16 border-b border-[var(--border)] flex items-center px-4 lg:px-6 justify-between">
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)]"
        >
          ☰
        </button>

        <h2 className="font-medium text-lg">
          {org?.name || "Workspace"}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {org?.plan && (
          <span className="px-3 py-1 rounded-full text-xs bg-[var(--card)] border border-[var(--border)]">
            {org.plan} PLAN
          </span>
        )}

        <button className="hidden sm:block px-4 py-2 rounded-lg bg-[var(--primary)] text-white">
          Invite
        </button>

        <ThemeToggle />

        <div className="w-9 h-9 rounded-full bg-[var(--card)] border border-[var(--border)]" />
      </div>
      
    </header>
  )
}

export default Topbar;
