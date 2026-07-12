import { json } from '../../lib/http.js';
import { listClicks } from '../../lib/db.js';

export const prerender = false;

// Puntos de click para el mapa de calor (protegido por el middleware).
export async function GET({ url }) {
  const device = url.searchParams.get('device') || 'todos';
  const puntos = await listClicks(device, 6000);
  return json({ device, puntos });
}
