import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import react from "@vitejs/plugin-react";
import unocss from "@unocss/vite";
import { presetWind3, presetTypography } from "unocss";

export default defineConfig({
  plugins: [
    react(),
    symfonyPlugin({
      // a boolean to activate stimulus with default options
      stimulus: true,
    }),
    unocss({
      content: {
        pipeline: {
          include: [
            /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|twig)($|\?)/,
          ],
          // exclude files
          // exclude: []
        },
        filesystem: ["./templates/**/*.html.twig"],
      },
      presets: [presetWind3(), presetTypography()],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        spa: "./assets/spa.tsx",
        htmx: "./assets/htmx.ts",
        live: "./assets/live.ts",
      },
    },
  },
});
