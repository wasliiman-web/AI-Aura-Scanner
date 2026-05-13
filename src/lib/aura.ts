import { AuraAnalysis, AuraArchetype } from "@/lib/types";

const ARCHETYPES: AuraArchetype[] = [
  "Solar Monarch",
  "Velvet Mystic",
  "Neon Prophet",
  "Midnight Strategist",
  "Stardust Rebel",
  "Ethereal Guardian"
];

const FALLBACK_VERDICTS = [
  "You walk in and the background music gets expensive; haters buffering at 2%.",
  "Final-boss entrance energy, but your inner monologue is still season-one chaotic.",
  "If this were a movie, your close-up just made three exes question their life choices."
];

const STRENGTH_POOL = [
  "Main-character confidence",
  "Elite side-eye radar",
  "Charisma with plot armor",
  "Camera-finds-you aura",
  "Chaos-resistant focus",
  "Luxury villain composure"
];

const WEAKNESS_POOL = [
  "Accidentally intimidates civilians",
  "Overthinks post captions",
  "Late-night spiral edits",
  "Too iconic to stay low-key",
  "Unnecessarily dramatic exits"
];

export function randomFallbackAnalysis(): AuraAnalysis {
  return {
    score: randomInt(72, 97),
    archetype: ARCHETYPES[randomInt(0, ARCHETYPES.length - 1)],
    strengths: pickMany(STRENGTH_POOL, 3),
    weaknesses: pickMany(WEAKNESS_POOL, 2),
    cinematicVerdict: FALLBACK_VERDICTS[randomInt(0, FALLBACK_VERDICTS.length - 1)],
    colorPalette: ["#7A3CFF", "#50D5FF", "#D7A84B"]
  };
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickMany(items: string[], count: number): string[] {
  const clone = [...items];
  const output: string[] = [];
  while (output.length < count && clone.length > 0) {
    const idx = randomInt(0, clone.length - 1);
    output.push(clone[idx]);
    clone.splice(idx, 1);
  }
  return output;
}
