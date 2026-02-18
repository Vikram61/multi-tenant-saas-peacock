import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useLayout } from "../context/LayoutContext";
import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { toggleSidebar } = useLayout();
  const { user, org, loading, permissions, logoutUser } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) return null;

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--card)] px-4 lg:px-8 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-9 h-9 rounded-lg border border-[var(--border)] hover:bg-[var(--hover)] transition flex items-center justify-center"
        >
          ☰
        </button>

        <div className="flex flex-col leading-tight">
          <span className="text-xs opacity-60">Workspace</span>
          <span className="font-semibold text-lg tracking-tight">
            {org?.name || "Workspace"}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* PLAN BADGE */}
        {org?.plan && (
          <span className="hidden md:flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--hover)] border border-[var(--border)]">
            {org.plan}
          </span>
        )}

        {/* INVITE */}
         {/* {permissions?.canInvite && (
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white hover:opacity-90 transition shadow-sm">
            + Invite
          </button>
        )}  */}

        {/* THEME */}
        <ThemeToggle />

        {/* USER MENU */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-[var(--hover)] transition"
          >
            <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xl overflow-hidden">

              <div className="px-4 py-3 border-b border-[var(--border)]">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs opacity-60">{user?.email}</div>
              </div>

              <button
                className="w-full text-left px-4 py-2 hover:bg-[var(--hover)]"
                onClick={() => (window.location.href = "/settings")}
              >
                Settings
              </button>

              <button
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10"
                onClick={logoutUser}
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
