import { json, readJson, clean } from '../../lib/http.js';
import { listComments, addComment } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  return json({ comentarios: await listComments(200) });
}

export async function POST({ request }) {
  const b = await readJson(request);
  const nombre = clean(b.nombre, 60);
  const texto = clean(b.texto, 600);
  if (nombre.length < 2 || texto.length < 2) {
    return json({ error: 'El nombre y el comentario son obligatorios.' }, 422);
  }
  const comentario = await addComment(nombre, texto);
  return json({ comentario }, 201);
}
