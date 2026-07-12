/** Ayudas para respuestas JSON en las API routes. */
export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const noContent = () => new Response(null, { status: 204 });

/** Lee el cuerpo JSON de una petición sin lanzar excepción. */
export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

/** Recorta y limpia texto de entrada del usuario.
 *  Elimina caracteres de control (conserva tabulador y salto de línea). */
export function clean(value, max) {
  const str = String(value ?? '');
  let out = '';
  for (const ch of str) {
    const c = ch.codePointAt(0);
    if (c < 32 && c !== 9 && c !== 10) continue; // controles, salvo tab/salto
    if (c === 127) continue; // DEL
    out += ch;
  }
  return out.trim().slice(0, max);
}
