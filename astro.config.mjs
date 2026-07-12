// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Despliegue en Vercel (SSR serverless). La base de datos es Turso (libSQL),
// configurada con las variables TURSO_DATABASE_URL y TURSO_AUTH_TOKEN.
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  compressHTML: true,
});
