import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Garante que os caminhos sejam relativos
  build: {
    outDir: 'dist', // Mantém a pasta de saída correta
  }
});
