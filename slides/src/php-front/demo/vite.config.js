import {defineConfig} from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        symfonyPlugin({
            // a boolean to activate stimulus with default options
            stimulus: true,
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                spa: "./assets/spa.tsx",
                htmx: "./assets/htmx.ts",
                live: "./assets/live.ts",
                datastar: "./assets/datastar.ts",
            },
        },
    },
});
