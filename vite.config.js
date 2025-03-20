import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        empresa: resolve(__dirname, 'forms-empresa.html'),
        cv: resolve(__dirname, 'forms-cv.html'),
      },
    },
  },
});