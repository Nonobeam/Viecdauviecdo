import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import EnvironmentPlugin from 'vite-plugin-environment';

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
  ],
  server: {
    port: 8989,
    mimeTypes: {
      'webmanifest': 'application/manifest+json'
    },
    allowedHosts: [
      "localhost",
      "exe.threemusketeer.click"
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
