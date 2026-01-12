"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="px-4 py-2 rounded bg-brand-default text-constant-inverse cursor-pointer hover:bg-brand-hover transition"
      onClick={toggleTheme}
    >
      Toggle to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
