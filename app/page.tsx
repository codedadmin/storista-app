"use client";

import { useRef, useState } from "react";
import { StarBackground } from "@/components/StarBackground";
import { StoryForm } from "@/components/StoryForm";
import { StoryOutput } from "@/components/StoryOutput";
import { generateStory } from "@/lib/openrouter";
import type { StoryInput } from "@/lib/types";

export default function Home() {
  const [story, setStory] = useState("");
  const [kidName, setKidName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  async function handleGenerate(data: StoryInput) {
    setIsGenerating(true);
    setError("");
    setStory("");
    setKidName(data.kidName);
    try {
      const result = await generateStory(data);
      setStory(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  function handleReset() {
    setStory("");
    setError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#06091A] via-[#080C1F] to-[#030510] overflow-x-hidden">
      <StarBackground />

      <div className="relative z-10 flex flex-col items-center px-4 py-14 min-h-screen">
        {/* Header */}
        <header className="text-center mb-10 select-none">
          <div className="text-7xl mb-3 drop-shadow-[0_0_30px_rgba(253,230,138,0.4)]">
            🌙
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-amber-300 tracking-wide mb-3 font-serif drop-shadow-[0_0_20px_rgba(253,230,138,0.3)]">
            Storista
          </h1>
          <p className="text-blue-200/80 text-base sm:text-lg max-w-sm mx-auto leading-relaxed">
            Turn your child&apos;s day into a magical bedtime story
          </p>
        </header>

        {/* Form */}
        <div ref={formRef} className="w-full max-w-2xl">
          <StoryForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 max-w-2xl w-full">
            <div className="text-red-300 bg-red-950/50 border border-red-700/50 rounded-xl p-4 text-sm text-center">
              {error}
            </div>
          </div>
        )}

        {/* Story Output */}
        {story && (
          <StoryOutput story={story} kidName={kidName} onReset={handleReset} />
        )}

        {/* Footer */}
        <footer className="mt-auto pt-16 text-slate-700 text-xs text-center">
          Made with ✨ for bedtime
        </footer>
      </div>
    </div>
  );
}
