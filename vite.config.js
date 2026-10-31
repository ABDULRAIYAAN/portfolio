import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()], base: "./", build: { chunkSizeWarningLimit: 6000, assetsInlineLimit: (f) => f.includes("/src/sb/") } });
