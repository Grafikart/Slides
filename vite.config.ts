import { defineConfig } from "vite";
import { globby } from "globby";
import { fileURLToPath } from "node:url";

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
