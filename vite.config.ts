import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    base: isProd ? '/otus_react/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: 'localhost',
      port: 2233,
      open: true,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
    },
    css: {
      modules: {
        generateScopedName: '[name]_[local]-[hash:base64:5]',
      },
    },
  };
});

