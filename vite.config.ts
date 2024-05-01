import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        display: "swap",
        families: {
          "Arcade Interlaced": {
            src: "./src/assets/fonts/Arcade-Interlaced.ttf",
          },
          "Las Enter": {
            src: "./src/assets/fonts/Las-Enter.ttf",
          },
        },
      },
      fontsource: {
        families: ["Baloo 2 Variable"],
      },
    }),
  ],
});
