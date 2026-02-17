import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full border border-[var(--border)] bg-[var(--hover)] flex items-center px-1 transition"
    >
      {/* ICONS */}
      <span className="absolute left-2 text-xs">☀️</span>
      <span className="absolute right-2 text-xs">🌙</span>

      {/* KNOB */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="w-6 h-6 rounded-full bg-[var(--primary)] shadow-md"
        style={{ marginLeft: isDark ? "24px" : "0px" }}
      />
    </button>
  );
};

export default ThemeToggle;
