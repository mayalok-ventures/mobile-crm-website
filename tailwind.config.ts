import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#000000",
        surface: {
          DEFAULT: "#FAFAFA",
          subtle: "#F4F4F5",
          elevated: "#FFFFFF",
          muted: "#EFEFEF",
        },
        border: {
          DEFAULT: "#E5E5E5",
          subtle: "#F0F0F0",
          strong: "#18181B",
          contrast: "#000000",
        },
        muted: {
          DEFAULT: "#71717A",
          foreground: "#52525B",
          subtle: "#A1A1AA",
        },
        brand: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SF Mono", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "2px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.04em",
        widest: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
