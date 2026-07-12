import { ADMIN_PASSWORD, authToken } from '../../lib/auth.js';

export const prerender = false;

const MONTH = 60 * 60 * 24 * 30;

// Verifica la contraseña del panel y crea la cookie de sesión de administrador.
export async function POST({ request, cookies, redirect }) {
  let password = '';
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    password = (await request.json().catch(() => ({}))).password || '';
  } else {
    const fd = await request.formData().catch(() => null);
    password = fd ? fd.get('password') || '' : '';
  }

  if (String(password) !== ADMIN_PASSWORD) {
    return redirect('/panel-login?error=1', 303);
  }

  cookies.set('panel', authToken(), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: MONTH,
  });
  return redirect('/panel', 303);
}
