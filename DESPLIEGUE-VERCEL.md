# Publicar NotiNoticias en internet (Vercel + Turso) — gratis y con URL fija

Resultado: tu blog quedará en una URL permanente tipo
`https://notinoticias.vercel.app`, con HTTPS, siempre en línea (sin tu PC),
y con la base de datos en la nube (Turso).

Todo lo de abajo es gratis. Necesitas 3 cuentas: GitHub, Turso y Vercel.

## Paso 1 — Subir el proyecto a GitHub

1. Crea una cuenta en https://github.com y un repositorio nuevo (por ejemplo `notinoticias`).
2. Sube esta carpeta al repositorio. Si tienes Git instalado, desde la carpeta:

   ```bash
   git init
   git add .
   git commit -m "Blog NotiNoticias"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/notinoticias.git
   git push -u origin main
   ```

   (O usa GitHub Desktop: "Add local repository" → Publish.)

## Paso 2 — Crear la base de datos en Turso

1. Entra a https://turso.tech y crea una cuenta (gratis).
2. Crea una base de datos nueva (New Database). Ponle el nombre que quieras.
3. Copia dos datos que te da Turso:
   - **Database URL** (empieza con `libsql://...`)
   - **Auth Token** (créalo en "Create Token" si no aparece)

   Guárdalos: los usarás en el Paso 3.

> No necesitas crear las tablas a mano: la app las crea sola la primera vez.

## Paso 3 — Desplegar en Vercel

1. Entra a https://vercel.com y regístrate con tu cuenta de GitHub.
2. "Add New… → Project" y elige tu repositorio `notinoticias`.
3. Antes de "Deploy", abre **Environment Variables** y agrega:

   | Nombre | Valor |
   |---|---|
   | `ADMIN_PASSWORD` | una clave fuerte (para el panel) |
   | `TURSO_DATABASE_URL` | el `libsql://...` del Paso 2 |
   | `TURSO_AUTH_TOKEN` | el token del Paso 2 |

4. Pulsa **Deploy**. En 1–2 minutos tendrás tu sitio en línea.

## Paso 4 — Elegir la URL "notinoticias"

- Vercel te da una URL automática. Para que diga *notinoticias*:
  Project → **Settings → Domains** → cambia/edita el dominio de Vercel a
  `notinoticias.vercel.app` (si está disponible).
- El panel de estadísticas queda en `https://notinoticias.vercel.app/panel`.

## Actualizar el sitio después

Cada vez que cambies algo, súbelo a GitHub:

```bash
git add .
git commit -m "cambios"
git push
```

Vercel lo detecta y **vuelve a publicar solo**. No hay que hacer nada más.

## ¿Y si algún día quiero notinoticias.com?

Compra el dominio (desde ~$4–10/año) y en Vercel → Settings → Domains agrégalo.
El sitio y el código no cambian.

## Probar en tu computadora (opcional)

```bash
npm install
npm run dev      # http://localhost:4321
```

En local, si no defines las variables de Turso, la base de datos usa un archivo
`./data/data.db` en tu PC (para pruebas).
