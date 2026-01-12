import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D3B26A",
        peacock: "#0E6B6B",
        anthracite: "#141619",
        bone: "#F5EFE6"
      }
    }
  },
  darkMode: ["class"],
  plugins: []
};

export default config;
