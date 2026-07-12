# El alma tallada en madera — Reportaje San Antonio de Ibarra

Blog/reportaje interactivo sobre los maestros artesanos del tallado en madera de
**San Antonio de Ibarra** (Imbabura, Ecuador). Hecho con **Astro** (SSR),
animaciones con **GSAP + ScrollTrigger**, scroll suave con **Lenis** y un backend
propio con **Turso** (SQLite en la nube) para visitas, comentarios, likes y mapa
de calor de clicks.

## Publicarlo en internet (gratis, URL fija)

Se despliega en **Vercel** con base de datos **Turso**. Guía paso a paso en
**[DESPLIEGUE-VERCEL.md](./DESPLIEGUE-VERCEL.md)**. En resumen:

1. Sube el proyecto a **GitHub**.
2. Crea una base gratis en **Turso** y copia su URL y token.
3. Importa el repo en **Vercel**, agrega las variables de entorno y pulsa Deploy.

Resultado: `https://notinoticias.vercel.app`, con HTTPS, siempre en línea y
actualización automática al hacer `git push`.

## Requisitos (para desarrollo local)

- [Node.js](https://nodejs.org) 18 o superior (recomendado 20 o 22 LTS).

## Puesta en marcha (local)

```bash
npm install
npm run dev      # http://localhost:4321
```

En local, si no defines las variables de Turso, la base de datos usa un archivo
`./data/data.db` automáticamente (para pruebas).

## Variables de entorno

Copia `.env.example` a `.env` (local) o configúralas en Vercel (producción):

- `ADMIN_PASSWORD` — contraseña del panel `/panel`. **Usa una clave fuerte.**
- `TURSO_DATABASE_URL` — URL `libsql://...` de tu base en Turso.
- `TURSO_AUTH_TOKEN` — token de acceso de Turso.

## Panel de administración

- `/panel-login` — ingresa la contraseña (`ADMIN_PASSWORD`).
- `/panel` — visitas, visitantes únicos, comentarios, likes, clicks, visitas por
  día, interacción por sección, **mapa de calor de clicks (zonas rojas)** con
  filtro escritorio/móvil, y moderación de comentarios (eliminar).

## Editar el contenido

Todo el texto, los datos e imágenes se controlan desde **`src/data/reportaje.js`**.
Los comentarios `// ← reemplazar` son placeholders para la info de los videos;
las cifras de estadísticas del reportaje son datos de ejemplo editables.

## Estructura del proyecto

```
Blog_Anahi/
├── Assets/                    # imágenes originales
├── public/images/            # imágenes optimizadas para web
├── src/
│   ├── data/reportaje.js     # ← CONTENIDO editable
│   ├── styles/global.css     # diseño y paleta
│   ├── scripts/main.js       # animaciones + integración con el backend
│   ├── layouts/Layout.astro
│   ├── components/           # una sección por componente
│   ├── lib/                  # db.js (Turso), schema.js, auth.js, http.js
│   ├── middleware.js         # sesión + protección del panel
│   └── pages/
│       ├── index.astro       # el reportaje
│       ├── panel.astro       # panel de estadísticas (protegido)
│       ├── panel-login.astro
│       └── api/              # visita, comentarios, like, track, stats, ...
├── astro.config.mjs          # adaptador de Vercel
├── DESPLIEGUE-VERCEL.md      # guía de publicación
└── package.json
```

## Analítica y mapa de calor (todo propio)

No se usan servicios externos de analítica. Cada visita, like, comentario y click
se registra en tu base de datos (Turso) mediante las API routes de
`src/pages/api/`. El heatmap se dibuja a mano en un `<canvas>` dentro de `/panel`
a partir de las posiciones relativas de cada click (funciona en escritorio y móvil).

## Notas

- **Responsive-first** (móvil y escritorio) y respeta `prefers-reduced-motion`.
- Los videos de YouTube se cargan de forma diferida (al pulsar la miniatura).
- El proyecto se entrega **sin** `node_modules`; se instala con `npm install`.
