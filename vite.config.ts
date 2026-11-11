import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: la web funciona en https://usuario.github.io/<repositorio>/
// sea cual sea el nombre del repositorio. Las rutas internas usan «#/…».
export default defineConfig({
  base: './',
  plugins: [react()],
});
