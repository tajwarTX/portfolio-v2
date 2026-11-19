import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    // three.js lives in the lazily loaded ModelViewer chunk
    chunkSizeWarningLimit: 1300,
  },
});
