import { defineConfig } from "vite";
import { globby } from "globby";
import { fileURLToPath } from "node:url";
import { svelte } from '@sveltejs/vite-plugin-svelte'

const realPath = (path: string): string => {
  return fileURLToPath(new URL(path, import.meta.url));
};

const pathToName = (path: string): string => {
  return path
    .replaceAll("/", "_")
    .replaceAll("src_", "")
    .replaceAll(".html", "");
};

const paths = ["index.html", ...(await globby(["src/**/index.html"]))];

export default defineConfig({
  plugins: [svelte()],
  base: '/Slides/',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        chunkFileNames: "[name].js"
      },
      input: paths.reduce((acc, r) => {
        return {
          ...acc,
          [pathToName(r)]: realPath(r),
        };
      }, {} as Record<string, string>),
    },
  },
});
