import { json, readJson } from '../../lib/http.js';
import { deleteComment } from '../../lib/db.js';

export const prerender = false;

export async function POST({ request }) {
  const b = await readJson(request);
  const id = Number(b.id);
  if (!id) return json({ error: 'id inválido' }, 422);
  return json({ ok: await deleteComment(id) });
}
