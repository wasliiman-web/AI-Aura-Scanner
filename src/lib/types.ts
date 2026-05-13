export type AuraArchetype =
  | "Solar Monarch"
  | "Velvet Mystic"
  | "Neon Prophet"
  | "Midnight Strategist"
  | "Stardust Rebel"
  | "Ethereal Guardian";

export interface AuraAnalysis {
  score: number;
  archetype: AuraArchetype;
  strengths: string[];
  weaknesses: string[];
  cinematicVerdict: string;
  colorPalette: string[];
}
