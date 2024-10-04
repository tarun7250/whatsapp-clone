import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable Vitest global functions like describe, it, test
    environment: 'jsdom', // Ensure the correct test environment for DOM testing
    setupFiles: './setupTests.ts', // Setup for RTL and Jest DOM
  },
});