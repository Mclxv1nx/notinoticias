import { json } from '../../lib/http.js';
import { fullStats } from '../../lib/db.js';

export const prerender = false;

export async function GET() {
  return json(await fullStats());
}
