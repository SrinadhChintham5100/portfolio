/*
 * vite.config.js — build tool configuration
 * ------------------------------------------------------------------
 * Vite does two jobs:
 *   1. `npm run dev`   → starts a local server with instant hot-reload
 *   2. `npm run build` → bundles + minifies everything into /dist,
 *                        which is the folder Netlify publishes.
 * Think of it as Maven/Gradle for the front end.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // teaches Vite how to read JSX
  build: {
    outDir: 'dist',
    // The 3D engine (three.js) is ~900 KB before gzip. That's expected, and
    // Hero.jsx lazy-loads it AFTER the text appears, so we raise the warning
    // limit instead of letting Vite complain on every build.
    chunkSizeWarningLimit: 1100,
  },
});
