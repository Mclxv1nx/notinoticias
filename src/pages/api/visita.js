import { json, readJson } from '../../lib/http.js';
import { recordVisit, publicCounters } from '../../lib/db.js';

export const prerender = false;

export async function POST({ request, cookies }) {
  const sid = cookies.get('sid')?.value || 'anon';
  const b = await readJson(request);
  const device = b.device === 'mobile' ? 'mobile' : 'desktop';
  const path = typeof b.path === 'string' ? b.path.slice(0, 300) : '/';
  await recordVisit(sid, path, device);
  return json(await publicCounters());
}
