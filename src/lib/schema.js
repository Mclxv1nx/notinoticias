/**
 * Esquema y sentencias SQL de la base de datos.
 * Se mantiene aparte (sin dependencias nativas) para poder probar el SQL de
 * forma aislada. `db.js` importa estas constantes y las ejecuta con SQLite.
 *
 * Todas las sentencias usan parámetros posicionales `?` para máxima
 * compatibilidad entre motores SQLite.
 */

export const SCHEMA = `
CREATE TABLE IF NOT EXISTS visits (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  ts     INTEGER NOT NULL,
  path   TEXT    NOT NULL,
  sid    TEXT    NOT NULL,
  device TEXT    NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_visits_ts  ON visits(ts);
CREATE INDEX IF NOT EXISTS idx_visits_sid ON visits(sid);

CREATE TABLE IF NOT EXISTS comments (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT    NOT NULL,
  body     TEXT    NOT NULL,
  ts       INTEGER NOT NULL,
  approved INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_comments_ts ON comments(ts);

CREATE TABLE IF NOT EXISTS likes (
  sid TEXT    PRIMARY KEY,
  ts  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS clicks (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  ts      INTEGER NOT NULL,
  path    TEXT    NOT NULL,
  x       REAL    NOT NULL,
  y       REAL    NOT NULL,
  vw      INTEGER NOT NULL,
  vh      INTEGER NOT NULL,
  section TEXT,
  device  TEXT    NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_clicks_device ON clicks(device);
`;

export const SQL = {
  // Visitas
  insertVisit: `INSERT INTO visits (ts, path, sid, device) VALUES (?, ?, ?, ?)`,
  countVisits: `SELECT COUNT(*) AS n FROM visits`,
  countUniqueVisitors: `SELECT COUNT(DISTINCT sid) AS n FROM visits`,
  visitsByDay: `
    SELECT strftime('%Y-%m-%d', ts / 1000, 'unixepoch') AS day, COUNT(*) AS n
    FROM visits GROUP BY day ORDER BY day DESC LIMIT 14`,

  // Comentarios
  insertComment: `INSERT INTO comments (name, body, ts) VALUES (?, ?, ?)`,
  getComment: `SELECT id, name, body, ts FROM comments WHERE id = ?`,
  listComments: `SELECT id, name, body, ts FROM comments WHERE approved = 1 ORDER BY ts DESC LIMIT ?`,
  deleteComment: `DELETE FROM comments WHERE id = ?`,
  countComments: `SELECT COUNT(*) AS n FROM comments WHERE approved = 1`,

  // Likes (uno por sesión)
  insertLike: `INSERT OR IGNORE INTO likes (sid, ts) VALUES (?, ?)`,
  deleteLike: `DELETE FROM likes WHERE sid = ?`,
  hasLiked: `SELECT 1 AS liked FROM likes WHERE sid = ?`,
  countLikes: `SELECT COUNT(*) AS n FROM likes`,

  // Clicks (heatmap)
  insertClick: `INSERT INTO clicks (ts, path, x, y, vw, vh, section, device) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  listClicksAll: `SELECT x, y, section, device FROM clicks ORDER BY id DESC LIMIT ?`,
  listClicksByDevice: `SELECT x, y, section, device FROM clicks WHERE device = ? ORDER BY id DESC LIMIT ?`,
  clicksBySection: `
    SELECT COALESCE(section, 'sin-seccion') AS section, COUNT(*) AS n
    FROM clicks GROUP BY section ORDER BY n DESC LIMIT 20`,
  countClicks: `SELECT COUNT(*) AS n FROM clicks`,
  visitsByDevice: `SELECT device, COUNT(*) AS n FROM visits GROUP BY device`,
};
