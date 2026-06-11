"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  story: string;
  kidName: string;
  onReset: () => void;
}

export function StoryOutput({ story, kidName, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [story]);

  async function handleCopy() {
    await navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div
      ref={ref}
      className="w-full max-w-2xl mt-8 mb-16"
      style={{ animation: "fadeSlideUp 0.6s ease-out both" }}
    >
      <div className="bg-slate-900/70 backdrop-blur-md border border-amber-700/30 rounded-2xl overflow-hidden shadow-2xl shadow-amber-950/30">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="text-amber-300 font-semibold">
              {kidName}&apos;s Bedtime Story
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-slate-400 hover:text-white hover:bg-slate-800 gap-1.5"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
          </Button>
        </div>

        {/* Story text */}
        <div className="px-6 py-8">
          <p className="text-slate-200 text-[1.05rem] leading-[1.9] font-serif whitespace-pre-wrap">
            {story}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700/50">
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full border-slate-600/60 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Another Story
          </Button>
        </div>
      </div>

      {/* Decorative stars below */}
      <p className="text-center text-slate-600 text-sm mt-6 tracking-widest">
        ✦ &nbsp; Sweet dreams &nbsp; ✦
      </p>
    </div>
  );
}
