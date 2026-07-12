import { json } from '../../lib/http.js';
import { likeState, toggleLike } from '../../lib/db.js';

export const prerender = false;

const sidOf = (cookies) => cookies.get('sid')?.value || 'anon';

export async function GET({ cookies }) {
  return json(await likeState(sidOf(cookies)));
}

export async function POST({ cookies }) {
  return json(await toggleLike(sidOf(cookies)));
}
