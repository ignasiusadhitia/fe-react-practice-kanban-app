import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
      pages: path.resolve('src/pages'),
      layouts: path.resolve('src/layouts'),
      components: path.resolve('src/components'),
      containers: path.resolve('src/containers'),
      api: path.resolve('src/api'),
      hooks: path.resolve('src/hooks'),
      utils: path.resolve('src/utils'),
      assets: path.resolve('src/assets'),
    },
  },
});
