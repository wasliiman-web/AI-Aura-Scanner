# Aura Rate AI

Dark-luxury, TikTok-style full-stack AI aura rating site built with Next.js + Tailwind.

## Features

- Image upload and instant preview
- AI aura analysis output:
  - aura score
  - archetype
  - strengths
  - weaknesses
  - cinematic verdict
- Animated dark luxury UI
- Mobile responsive layout
- Shareable downloadable result card

## Setup

1. Install dependencies:
   - `npm install`
2. Copy env file:
   - `cp .env.example .env.local`
3. Add your OpenAI key in `.env.local`
4. Run:
   - `npm run dev`

Open [http://localhost:3000](http://localhost:3000).

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the repo into [Vercel](https://vercel.com/new).
3. Add environment variable in Vercel project settings:
   - `OPENAI_API_KEY`
4. Deploy.

### Production Notes

- API route runtime is Node.js with max duration set for serverless execution.
- Upload validation enforces JPG/PNG/WEBP and max file size of 4MB for reliable serverless behavior.
- Required Node version is `>=20`.

## Notes

- If `OPENAI_API_KEY` is missing or API call fails, the app returns a stylish fallback aura result so the UX still works.
# AI-Aura-Scanner
