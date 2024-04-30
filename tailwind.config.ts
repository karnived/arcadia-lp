import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ["var(--font-arcade)"],
        headline: ["var(--font-headline)"],
        enter: ["var(--font-enter)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
