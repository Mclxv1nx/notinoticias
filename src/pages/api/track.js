import { noContent, readJson } from '../../lib/http.js';
import { recordClick } from '../../lib/db.js';

export const prerender = false;

export async function POST({ request }) {
  const b = await readJson(request);
  const items = Array.isArray(b.clicks) ? b.clicks.slice(0, 50) : [b];
  for (const c of items) {
    if (c && typeof c === 'object') await recordClick(c);
  }
  return noContent();
}
