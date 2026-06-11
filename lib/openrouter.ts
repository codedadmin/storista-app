import type { Theme, StoryInput } from "./types";

const THEME_STYLES: Record<Theme, string> = {
  fantasy: "magical and enchanting, with wizards, dragons, and mystical creatures",
  comedy: "funny, silly, and full of humor, wordplay, and unexpected twists",
  scifi: "futuristic, full of gadgets, space travel, robots, and scientific wonder",
  horror: "spooky, suspenseful, and mysterious — eerie but age-appropriate, no gore",
};

export async function generateStory(input: StoryInput): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  const model =
    process.env.NEXT_PUBLIC_OPENROUTER_MODEL || "google/gemini-flash-1.5";

  if (!apiKey) {
    throw new Error(
      "OpenRouter API key is missing. Add NEXT_PUBLIC_OPENROUTER_API_KEY to your .env.local file."
    );
  }

  const prompt = `You are a magical bedtime story writer for children. Create a bedtime story for ${input.kidName}, who is ${input.kidAge} years old.

Story style: ${THEME_STYLES[input.theme]}.

Events from today to weave into the story:
${input.events}

Requirements:
- Make ${input.kidName} the hero of the story
- Naturally weave in today's real events in a creative, imaginative way
- Age-appropriate for a ${input.kidAge}-year-old
- Length: 350–500 words
- Clear beginning, middle, and end
- End peacefully to ease the child into sleep
- Write only the story — no title, no preamble, just the narrative`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          typeof window !== "undefined" ? window.location.origin : "storista",
        "X-Title": "Storista",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.88,
        max_tokens: 1200,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      (err as { error?: { message?: string } }).error?.message ||
        `API error: ${response.status}`
    );
  }

  const data = await response.json() as {
    choices: Array<{ message: { content: string } }>;
  };
  return data.choices[0]?.message?.content ?? "";
}
