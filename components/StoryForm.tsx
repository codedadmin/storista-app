"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThemeSelector } from "@/components/ThemeSelector";
import type { Theme, StoryInput } from "@/lib/types";

interface Props {
  onGenerate: (data: StoryInput) => void;
  isGenerating: boolean;
}

export function StoryForm({ onGenerate, isGenerating }: Props) {
  const [kidName, setKidName] = useState("");
  const [kidAge, setKidAge] = useState("");
  const [theme, setTheme] = useState<Theme>("fantasy");
  const [events, setEvents] = useState("");

  const canSubmit = kidName.trim() && kidAge && events.trim() && !isGenerating;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onGenerate({ kidName: kidName.trim(), kidAge, theme, events: events.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-slate-950/50">
        {/* Name + Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="kidName" className="text-blue-200 text-sm font-medium">
              Child&apos;s Name
            </Label>
            <Input
              id="kidName"
              placeholder="e.g. Layla"
              value={kidName}
              onChange={(e) => setKidName(e.target.value)}
              required
              className="bg-slate-800/70 border-slate-600/60 text-white placeholder:text-slate-500 focus-visible:ring-amber-400/50 focus-visible:border-amber-400/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kidAge" className="text-blue-200 text-sm font-medium">
              Age
            </Label>
            <Input
              id="kidAge"
              type="number"
              placeholder="e.g. 6"
              min={1}
              max={15}
              value={kidAge}
              onChange={(e) => setKidAge(e.target.value)}
              required
              className="bg-slate-800/70 border-slate-600/60 text-white placeholder:text-slate-500 focus-visible:ring-amber-400/50 focus-visible:border-amber-400/50"
            />
          </div>
        </div>

        {/* Theme */}
        <div className="space-y-3">
          <Label className="text-blue-200 text-sm font-medium">Story Theme</Label>
          <ThemeSelector selected={theme} onSelect={setTheme} />
        </div>

        {/* Events */}
        <div className="space-y-2">
          <Label htmlFor="events" className="text-blue-200 text-sm font-medium">
            What happened today?
          </Label>
          <Textarea
            id="events"
            placeholder="Describe the day's adventures... (e.g. We went to the park, Layla found a frog, we had ice cream, then she watched cartoons and helped cook dinner)"
            value={events}
            onChange={(e) => setEvents(e.target.value)}
            required
            rows={5}
            className="bg-slate-800/70 border-slate-600/60 text-white placeholder:text-slate-500 focus-visible:ring-amber-400/50 focus-visible:border-amber-400/50 resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-semibold text-base py-6 rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin inline-block">✨</span>
              Weaving your story…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Generate Story
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
