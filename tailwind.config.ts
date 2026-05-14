import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"]
      },
      colors: {
        luxe: {
          950: "#05020A",
          900: "#0B0712",
          800: "#120E1C",
          700: "#221334",
          gold: "#D7A84B",
          plum: "#7A3CFF",
          cyan: "#50D5FF"
        }
      },
      boxShadow: {
        neon: "0 0 30px rgba(122, 60, 255, 0.25)",
        gold: "0 0 40px rgba(215, 168, 75, 0.22)"
      },
      backgroundImage: {
        "aura-gradient": "radial-gradient(circle at 30% 20%, rgba(122, 60, 255, 0.35), transparent 45%), radial-gradient(circle at 70% 35%, rgba(80, 213, 255, 0.24), transparent 48%), linear-gradient(135deg, #05020A 0%, #120E1C 45%, #0B0712 100%)"
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { filter: "drop-shadow(0 0 10px rgba(80, 213, 255, 0.4))" },
          "50%": { filter: "drop-shadow(0 0 24px rgba(122, 60, 255, 0.6))" }
        }
      }
    }
  },
  plugins: []
};

export default config;
