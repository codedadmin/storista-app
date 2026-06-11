export type Theme = "horror" | "comedy" | "scifi" | "fantasy";

export interface StoryInput {
  kidName: string;
  kidAge: string;
  theme: Theme;
  events: string;
}

export interface ThemeConfig {
  id: Theme;
  label: string;
  emoji: string;
  description: string;
  color: string;
  borderColor: string;
  bgColor: string;
  glowColor: string;
}
