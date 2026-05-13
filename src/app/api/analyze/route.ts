import { NextResponse } from "next/server";
import { randomFallbackAnalysis } from "@/lib/aura";
import { AuraAnalysis } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const PROMPT = `You are an AI aura-reading engine with TikTok narrator energy.
Style requirements:
- Be funny, cinematic, slightly savage, and highly shareable.
- Roast playfully, not cruelly (no hate, harassment, slurs, or explicit content).
- Make each line feel like a dramatic voiceover or viral caption.
- Keep strengths and weaknesses short, punchy, and meme-friendly.
- cinematicVerdict must be one spicy sentence with main-character chaos.
Return ONLY valid JSON in this exact structure:
{
  "score": number (0-100),
  "archetype": string (one of: Solar Monarch, Velvet Mystic, Neon Prophet, Midnight Strategist, Stardust Rebel, Ethereal Guardian),
  "strengths": string[] (3 concise traits),
  "weaknesses": string[] (2 concise traits),
  "cinematicVerdict": string (one dramatic sentence),
  "colorPalette": string[] (3 hex color strings)
}`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 });
    }
    if (!ALLOWED_MIME_TYPES.has(image.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, and WEBP are supported." }, { status: 400 });
    }
    if (image.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Image is too large. Please upload a file under 4MB." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(randomFallbackAnalysis());
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const base64Image = imageBuffer.toString("base64");
    const mimeType = image.type || "image/jpeg";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: PROMPT },
              {
                type: "input_image",
                image_url: `data:${mimeType};base64,${base64Image}`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("OpenAI request failed.");
    }

    const result = (await response.json()) as {
      output_text?: string;
    };

    const raw = result.output_text ?? "";
    const parsed = JSON.parse(raw) as AuraAnalysis;
    const isValid =
      typeof parsed.score === "number" &&
      typeof parsed.archetype === "string" &&
      Array.isArray(parsed.strengths) &&
      Array.isArray(parsed.weaknesses) &&
      typeof parsed.cinematicVerdict === "string" &&
      Array.isArray(parsed.colorPalette);
    if (!isValid) {
      throw new Error("Invalid response schema.");
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(randomFallbackAnalysis());
  }
}
