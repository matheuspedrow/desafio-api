import { defineConfig } from 'vite';

export default defineConfig({
  // Configuração básica do Vite
  server: {
    port: 3000,
    open: true, // Abre automaticamente o navegador
    host: true  // Permite acesso externo
  },
  
  // Configurações de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  
  // Configurações de preview
  preview: {
    port: 4173,
    open: true
  }
});
