/**
 * Capa de datos con Turso (libSQL).
 * - En producción (Vercel) usa TURSO_DATABASE_URL + TURSO_AUTH_TOKEN.
 * - En local, si no hay variables, cae a un archivo SQLite (file:./data/data.db).
 * El SQL vive en schema.js y es el mismo en ambos casos.
 */
import { createClient } from '@libsql/client';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { SCHEMA, SQL } from './schema.js';

const MAX_CLICKS = 20000; // límite para que el heatmap no crezca sin control

let _db = null;
let _ready = null;

function client() {
  if (_db) return _db;
  const url = process.env.TURSO_DATABASE_URL || 'file:./data/data.db';
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (url.startsWith('file:')) {
    const file = url.slice(5).replace(/^\/\//, '');
    try { mkdirSync(dirname(file), { recursive: true }); } catch {}
  }
  _db = createClient(authToken ? { url, authToken } : { url });
  return _db;
}

// Crea las tablas la primera vez (idempotente).
function ready() {
  if (!_ready) {
    const stmts = SCHEMA.split(';').map((s) => s.trim()).filter(Boolean);
    _ready = client().batch(stmts, 'write');
  }
  return _ready;
}

const toRows = (rs) =>
  rs.rows.map((r) => Object.fromEntries(rs.columns.map((c, i) => [c, r[i]])));
const num = (v) => Number(v || 0);

async function run(key, args = []) {
  await ready();
  return client().execute({ sql: SQL[key], args });
}
async function all(key, args = []) {
  return toRows(await run(key, args));
}
async function first(key, args = []) {
  return (await all(key, args))[0] || {};
}

/* --------------------------------------------------------------- Visitas */
export async function recordVisit(sid, path, device) {
  await run('insertVisit', [Date.now(), path, sid, device]);
}

/* -------------------------------------------------------------- Comentarios */
export async function addComment(name, body) {
  const r = await run('insertComment', [name, body, Date.now()]);
  return first('getComment', [Number(r.lastInsertRowid)]);
}
export async function listComments(limit = 200) {
  return all('listComments', [limit]);
}
export async function deleteComment(id) {
  const r = await run('deleteComment', [id]);
  return r.rowsAffected > 0;
}

/* ------------------------------------------------------------------- Likes */
export async function toggleLike(sid) {
  const liked = (await run('hasLiked', [sid])).rows.length > 0;
  if (liked) await run('deleteLike', [sid]);
  else await run('insertLike', [sid, Date.now()]);
  return { liked: !liked, count: num((await first('countLikes')).n) };
}
export async function likeState(sid) {
  const liked = (await run('hasLiked', [sid])).rows.length > 0;
  return { liked, count: num((await first('countLikes')).n) };
}

/* ------------------------------------------------------------------ Clicks */
export async function recordClick(c) {
  await run('insertClick', [
    Date.now(),
    c.path || '/',
    Number(c.x) || 0,
    Number(c.y) || 0,
    Math.round(Number(c.vw) || 0),
    Math.round(Number(c.vh) || 0),
    c.section || null,
    c.device === 'mobile' ? 'mobile' : 'desktop',
  ]);
  if (Math.random() < 0.02) {
    await ready();
    await client().execute(
      `DELETE FROM clicks WHERE id NOT IN (SELECT id FROM clicks ORDER BY id DESC LIMIT ${MAX_CLICKS})`
    );
  }
}
export async function listClicks(device, limit = 5000) {
  return device === 'mobile' || device === 'desktop'
    ? all('listClicksByDevice', [device, limit])
    : all('listClicksAll', [limit]);
}

/* --------------------------------------------------------- Contadores públicos */
export async function publicCounters() {
  const [v, u, c, l] = await Promise.all([
    first('countVisits'),
    first('countUniqueVisitors'),
    first('countComments'),
    first('countLikes'),
  ]);
  return { visitas: num(v.n), visitantes: num(u.n), comentarios: num(c.n), likes: num(l.n) };
}

/* ----------------------------------------------------- Estadísticas del panel */
export async function fullStats() {
  const [base, clk, dia, sec, coms] = await Promise.all([
    publicCounters(),
    first('countClicks'),
    all('visitsByDay'),
    all('clicksBySection'),
    listComments(500),
  ]);
  return {
    ...base,
    clicks: num(clk.n),
    porDia: dia.reverse(),
    porSeccion: sec,
    comentarios_lista: coms,
  };
}
