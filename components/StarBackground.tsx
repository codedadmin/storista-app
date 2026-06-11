"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.65 + 0.15,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 6,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Moon glow */}
      <div
        className="absolute rounded-full"
        style={{
          top: "6%",
          right: "10%",
          width: "90px",
          height: "90px",
          background:
            "radial-gradient(circle, rgba(253,230,138,0.25) 0%, rgba(253,230,138,0.08) 50%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
