import { defineConfig } from 'vite';
import fs from 'fs-extra';
import path from 'path';

export default defineConfig({
  base: './', // Mantém caminhos relativos para funcionar em qualquer ambiente
  build: {
    outDir: 'dist', // Pasta de saída
  },
  plugins: [
    {
      name: 'copy-src',
      closeBundle: () => {
        fs.copySync(path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dist/src'));
      }
    }
  ]
});
