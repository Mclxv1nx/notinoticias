/**
 * Utilidades de autenticación del panel de administración.
 * La protección es sencilla (una contraseña) pensada para un sitio autoalojado.
 * IMPORTANTE: define una contraseña fuerte en la variable de entorno
 * ADMIN_PASSWORD y sirve el sitio siempre por HTTPS (el túnel lo garantiza).
 */
import { createHash } from 'node:crypto';

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cambia-esta-clave';

/** Token determinista derivado de la contraseña (se guarda en la cookie). */
export function authToken() {
  return createHash('sha256').update('panel:' + ADMIN_PASSWORD).digest('hex');
}

/** Rutas que requieren sesión de administrador. */
export function isProtected(pathname) {
  return (
    pathname === '/panel' ||
    pathname.startsWith('/panel/') ||
    pathname.startsWith('/api/stats') ||
    pathname.startsWith('/api/heatmap') ||
    pathname.startsWith('/api/moderar')
  );
}
