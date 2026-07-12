import { json } from '../../lib/http.js';
import { publicCounters } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  return json(await publicCounters());
}
