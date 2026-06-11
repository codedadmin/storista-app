"use client";

import type { Theme, ThemeConfig } from "@/lib/types";

const THEMES: ThemeConfig[] = [
  {
    id: "fantasy",
    label: "Fantasy",
    emoji: "🐉",
    description: "Magic & dragons",
    color: "text-purple-300",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-950/50",
    glowColor: "shadow-purple-900/50",
  },
  {
    id: "comedy",
    label: "Comedy",
    emoji: "😄",
    description: "Silly & fun",
    color: "text-yellow-300",
    borderColor: "border-yellow-500",
    bgColor: "bg-yellow-950/50",
    glowColor: "shadow-yellow-900/50",
  },
  {
    id: "scifi",
    label: "Sci-Fi",
    emoji: "🚀",
    description: "Space & robots",
    color: "text-cyan-300",
    borderColor: "border-cyan-500",
    bgColor: "bg-cyan-950/50",
    glowColor: "shadow-cyan-900/50",
  },
  {
    id: "horror",
    label: "Horror",
    emoji: "👻",
    description: "Spooky & thrilling",
    color: "text-red-300",
    borderColor: "border-red-500",
    bgColor: "bg-red-950/50",
    glowColor: "shadow-red-900/50",
  },
];

interface Props {
  selected: Theme;
  onSelect: (theme: Theme) => void;
}

export function ThemeSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {THEMES.map((theme) => {
        const isSelected = selected === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelect(theme.id)}
            className={`
              flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
              ${
                isSelected
                  ? `${theme.bgColor} ${theme.borderColor} scale-105 shadow-lg ${theme.glowColor}`
                  : "bg-slate-800/40 border-slate-700/40 hover:border-slate-500 hover:bg-slate-800/60"
              }
            `}
          >
            <span className="text-2xl">{theme.emoji}</span>
            <span
              className={`font-semibold text-sm ${isSelected ? theme.color : "text-slate-400"}`}
            >
              {theme.label}
            </span>
            <span className="text-xs text-slate-500">{theme.description}</span>
          </button>
        );
      })}
    </div>
  );
}
