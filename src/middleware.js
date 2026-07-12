/**
 * Middleware global:
 *  1. Asegura una cookie de sesión anónima (`sid`) para contar visitantes
 *     únicos y limitar los likes a uno por sesión.
 *  2. Protege el panel de administración y sus endpoints con la cookie `panel`.
 */
import { defineMiddleware } from 'astro:middleware';
import { randomUUID } from 'node:crypto';
import { authToken, isProtected } from './lib/auth.js';

const YEAR = 60 * 60 * 24 * 365;

export const onRequest = defineMiddleware(async (context, next) => {
  // 1) Sesión anónima
  if (!context.cookies.has('sid')) {
    context.cookies.set('sid', randomUUID(), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: YEAR,
    });
  }

  // 2) Protección del panel
  if (isProtected(context.url.pathname)) {
    const ok = context.cookies.get('panel')?.value === authToken();
    if (!ok) {
      if (context.url.pathname.startsWith('/api/')) {
        return new Response(JSON.stringify({ error: 'no autorizado' }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        });
      }
      return context.redirect('/panel-login', 302);
    }
  }

  return next();
});
