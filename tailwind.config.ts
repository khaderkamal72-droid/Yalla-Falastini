import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF7EC",
          soft: "#F4EEDD",
        },
        forest: {
          DEFAULT: "#1F4A38",
          dark: "#123326",
          light: "#2E6B51",
        },
        olive: {
          DEFAULT: "#8A9A5B",
          light: "#B9C48E",
        },
        gold: {
          DEFAULT: "#D4A24C",
          light: "#EAC57E",
        },
        beige: "#E9DFC3",
        clay: "#C1503F",
        ink: {
          DEFAULT: "#26301F",
          soft: "#6B7264",
        },
      },
      fontFamily: {
        display: ["Cairo", "sans-serif"],
        body: ["Inter", "sans-serif"],
        arabic: ["Cairo", "sans-serif"],
      },
      borderRadius: {
        xl2: "26px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(31,74,56,0.12)",
        "card-sm": "0 4px 14px rgba(31,74,56,0.08)",
      },
      backgroundImage: {
        "tatreez-strip":
          "repeating-linear-gradient(45deg, transparent 0 5px, #D4A24C 5px 6px, transparent 6px 11px), repeating-linear-gradient(-45deg, transparent 0 5px, #1F4A38 5px 6px, transparent 6px 11px)",
      },
    },
  },
  plugins: [],
};
export default config;
