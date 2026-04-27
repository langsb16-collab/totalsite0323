import React from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export default function ThemeToggle({ isDark, setIsDark }: ThemeToggleProps) {
  const handleToggle = () => {
    console.log('Theme toggle clicked, current isDark:', isDark);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 border border-white/10 hover:bg-white/10 transition-all duration-300"
      aria-label="Toggle theme"
      title={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-blue-500" />
      )}
      <span className="text-sm font-medium text-white">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
