export const prerender = false;

// Cierra la sesión del panel.
export function GET({ cookies, redirect }) {
  cookies.delete('panel', { path: '/' });
  return redirect('/panel-login', 303);
}
