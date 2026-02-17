import {motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {

    const {theme, toggleTheme} = useTheme();
  return (
    <div>
        <button
        onClick={toggleTheme}
        className="relative w-14 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center px-1"
        >
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-6 h-6 rounded-full bg-[var(--primary)]"
            style={{
            marginLeft: theme === "light" ? "22px" : "0px"
            }}
        />
        </button>

    </div>
  )
}

export default ThemeToggle