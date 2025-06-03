import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import path from "node:path";
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from "url";
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    nodePolyfills({
      globals: {
        process: true,
        Buffer: true,
      },
    }),
    EnvironmentPlugin({}),
    visualizer({ open: true }),
  ],
  server: {
    port: 8989,
    mimeTypes: {
      'webmanifest': 'application/manifest+json'
    },
    allowedHosts: [
      "localhost",
      "exe.threemusketeer.click",
      "matchlent.xyz"
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
