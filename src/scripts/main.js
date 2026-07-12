/* =============================================================================
 *  main.js — Animaciones e interactividad del reportaje
 *  ---------------------------------------------------------------------------
 *  - GSAP + ScrollTrigger : reveals con scroll (adelante y reversa), parallax,
 *                           contadores e infografías animadas.
 *  - Lenis                : scroll suave sincronizado con ScrollTrigger.
 *  - Interacción con mouse: tilt 3D (CSS3D), movimiento del fondo y flotantes.
 *  - Lógica del sitio     : navegación, videos, galería/lightbox, formularios,
 *                           compartir y comentarios.
 *  Todo respeta `prefers-reduced-motion`.
 * ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export function initApp() {
  // Marca que el JS arrancó (desactiva el fallback de visibilidad del Layout).
  document.body.classList.add('is-animated');

  // La lógica funcional se activa siempre (con o sin animación).
  setupNav();
  setupVideos();
  setupGallery();
  setupContactForm();
  setupShare();
  setupComments();
  setupLike();
  setupLiveCounters();
  pingVisit();
  setupClickTracking();

  if (REDUCE) {
    // Sin animación: dejamos todo en su estado final.
    revealStatic();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const lenis = setupSmoothScroll();
  setupReveals();
  setupParallax();
  setupCounters();
  setupBars();
  if (!isTouch) {
    setupTilt();
    setupPointerScene();
  }
  setupBackgroundScroll();

  // Recalcula posiciones cuando cargan las imágenes.
  window.addEventListener('load', () => ScrollTrigger.refresh());

  return lenis;
}

/* -------------------------------------------------------------- Smooth scroll */
function setupSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
  return lenis;
}

/* ------------------------------------------------------------------- Reveals */
/* Cada elemento [data-reveal] aparece al entrar en pantalla y se revierte al
   volver a subir (scroll adelante y reversa). */
function setupReveals() {
  $$('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 34 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          toggleActions: 'play none none reverse', // reversa al subir
        },
      }
    );
  });
}

/* ------------------------------------------------------------------ Parallax */
/* Elementos [data-parallax="factor"] se desplazan de forma continua con el
   scroll (scrub → adelante y reversa fluidas). */
function setupParallax() {
  $$('[data-parallax]').forEach((el) => {
    const factor = parseFloat(el.dataset.parallax) || 0.1;
    gsap.to(el, {
      yPercent: factor * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/* ------------------------------------------------------------------ Tilt 3D */
/* Inclinación 3D de tarjetas según la posición del cursor (CSS3D). */
function setupTilt() {
  $$('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.tiltMax) || 8;
    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    gsap.set(el, { transformPerspective: 900, transformOrigin: 'center' });

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotY(px * max * 2);
      rotX(-py * max * 2);
    });
    el.addEventListener('pointerleave', () => {
      rotX(0);
      rotY(0);
    });
  });
}

/* ------------------------------------------------- Movimiento con el mouse */
/* Fondo (blobs), colinas y flotantes del hero reaccionan al cursor. */
function setupPointerScene() {
  const blobs = $$('[data-blob]').map((el) => ({
    el,
    depth: (parseFloat(el.dataset.blob) || 1) * 14,
    x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power2.out' }),
    y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power2.out' }),
  }));
  const floats = $$('[data-float]').map((el) => ({
    el,
    depth: parseFloat(el.dataset.float) || 1,
    x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power2.out' }),
    y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power2.out' }),
  }));
  const hills = $('[data-hills]');
  const hillX = hills ? gsap.quickTo(hills, 'x', { duration: 1.4, ease: 'power2.out' }) : null;

  window.addEventListener('pointermove', (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    blobs.forEach((b) => {
      b.x(nx * b.depth);
      b.y(ny * b.depth);
    });
    floats.forEach((f) => {
      f.x(nx * f.depth * 18);
      f.y(ny * f.depth * 18);
    });
    if (hillX) hillX(nx * 20);
  });
}

/* ----------------------------------------------- Parallax del fondo (scroll) */
function setupBackgroundScroll() {
  $$('[data-blob]').forEach((el, i) => {
    gsap.to(el, {
      yPercent: (i % 2 === 0 ? -1 : 1) * 18,
      ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true },
    });
  });
  const hills = $('[data-hills]');
  if (hills) {
    gsap.to(hills, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true },
    });
  }
}

/* ----------------------------------------------------------------- Contadores */
function setupCounters() {
  $$('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count) || 0;
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
        }),
      onLeaveBack: () => {
        gsap.killTweensOf(obj);
        obj.v = 0;
        el.textContent = '0';
      },
    });
  });
}

/* --------------------------------------------------------------- Infografía */
function setupBars() {
  $$('[data-bar]').forEach((el) => {
    const scale = Math.max(0, Math.min(1, parseFloat(el.dataset.bar) || 0));
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: scale,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' },
      }
    );
  });
}

/* Estado final sin animaciones (reduced motion) */
function revealStatic() {
  $$('[data-count]').forEach((el) => (el.textContent = el.dataset.count));
  $$('[data-bar]').forEach((el) => {
    el.style.transform = `scaleX(${Math.min(1, parseFloat(el.dataset.bar) || 0)})`;
  });
}

/* ----------------------------------------------------------------- Navegación */
function setupNav() {
  const nav = $('[data-nav]');
  const toggle = $('[data-nav-toggle]');
  const panel = $('[data-nav-panel]');
  if (!nav) return;

  // Sombra/fondo al hacer scroll.
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil.
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  };
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Scroll suave a las anclas (usa Lenis si está disponible).
  $$('a[href^="#"]', nav).forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (window.__lenis) window.__lenis.scrollTo(target, { offset: -60 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Enlace activo según la sección visible.
  const links = $$('[data-nav-link]');
  const byId = new Map(links.map((l) => [l.dataset.navLink, l]));
  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove('is-active'));
            byId.get(entry.target.id)?.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
  }
}

/* --------------------------------------------------------------------- Videos */
/* Carga diferida de YouTube: la miniatura se sustituye por el iframe al pulsar. */
function setupVideos() {
  $$('[data-video-id]').forEach((frame) => {
    const play = () => {
      const id = frame.dataset.videoId;
      const title = frame.dataset.videoTitle || 'Entrevista';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = title;
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      frame.innerHTML = '';
      frame.appendChild(iframe);
    };
    frame.addEventListener('click', play);
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        play();
      }
    });
  });
}

/* ------------------------------------------------------------ Galería / lightbox */
function setupGallery() {
  const modal = $('[data-lightbox-modal]');
  if (!modal) return;
  const img = $('[data-lightbox-img]', modal);
  const cap = $('[data-lightbox-cap]', modal);

  const open = (src, caption, alt) => {
    img.src = src;
    img.alt = alt || '';
    cap.textContent = caption || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    window.__lenis?.stop();
  };
  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    window.__lenis?.start();
  };

  $$('[data-lightbox]').forEach((item) => {
    item.addEventListener('click', () =>
      open(item.dataset.lightbox, item.dataset.caption, $('img', item)?.alt)
    );
  });
  $('[data-lightbox-close]', modal)?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
}

/* ------------------------------------------------------------ Formulario contacto */
function setupContactForm() {
  const form = $('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    const dest = form.dataset.email || $('.contacto__mail')?.textContent?.trim() || '';
    const asunto = encodeURIComponent(`Reportaje San Antonio — mensaje de ${nombre}`);
    const cuerpo = encodeURIComponent(`${mensaje}\n\n— ${nombre} (${email})`);
    form.classList.add('is-sent');
    window.location.href = `mailto:${dest}?subject=${asunto}&body=${cuerpo}`;
  });
}

/* ------------------------------------------------------------------- Compartir */
function setupShare() {
  const bar = $('[data-share]');
  if (!bar) return;
  const url = window.location.href;
  const title = document.title;

  $('[data-share-native]', bar)?.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* cancelado */
      }
    } else {
      copy();
    }
  });

  const copyBtn = $('[data-share-copy]', bar);
  const copyLabel = $('[data-copy-label]', bar);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      if (copyLabel) {
        const prev = copyLabel.textContent;
        copyLabel.textContent = '¡Enlace copiado!';
        setTimeout(() => (copyLabel.textContent = prev), 1800);
      }
    } catch {
      window.prompt('Copia el enlace:', url);
    }
  };
  copyBtn?.addEventListener('click', copy);

  // Redes: usan intención de compartir cuando existe; si no, copian el enlace.
  $$('[data-share-net]', bar).forEach((btn) => {
    btn.addEventListener('click', () => {
      const net = btn.dataset.shareNet;
      const enc = encodeURIComponent(url);
      const map = {
        // Instagram y TikTok no admiten compartir por URL directa en web:
        // se usa el compartir nativo del móvil o se copia el enlace.
        youtube: `https://www.youtube.com/`,
      };
      if (net === 'youtube') {
        window.open(map.youtube, '_blank', 'noopener');
      } else if (navigator.share) {
        navigator.share({ title, url }).catch(() => {});
      } else {
        copy();
      }
    });
  });
}

/* --------------------------------------------------- Utilidades de backend */
const deviceType = () => (window.innerWidth < 700 ? 'mobile' : 'desktop');
const nfmt = (n) => Number(n || 0).toLocaleString('es-EC');

/* Rellena los contadores en vivo de la página ([data-live="..."]). */
function fillCounters(d) {
  if (!d) return;
  const map = {
    visitas: d.visitas,
    visitantes: d.visitantes,
    comentarios: d.comentarios,
    likes: d.likes,
  };
  Object.entries(map).forEach(([k, v]) => {
    if (v == null) return;
    $$(`[data-live="${k}"]`).forEach((el) => (el.textContent = nfmt(v)));
  });
}
async function refreshCounters() {
  try {
    const r = await fetch('/api/contadores');
    if (r.ok) fillCounters(await r.json());
  } catch {
    /* servidor no disponible */
  }
}
function setupLiveCounters() {
  refreshCounters();
}

/* Registra la visita al cargar la página. */
async function pingVisit() {
  try {
    const r = await fetch('/api/visita', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ path: location.pathname, device: deviceType() }),
    });
    if (r.ok) fillCounters(await r.json());
  } catch {
    /* sin servidor: la página funciona igual, sin contar la visita */
  }
}

/* ----------------------------------------------------------------- Like */
function setupLike() {
  const btn = $('[data-like]');
  if (!btn) return;
  const countEl = $('[data-like-count]') || null;
  const paint = (s) => {
    btn.classList.toggle('is-liked', !!s.liked);
    btn.setAttribute('aria-pressed', String(!!s.liked));
    if (countEl && s.count != null) countEl.textContent = nfmt(s.count);
    fillCounters({ likes: s.count });
  };
  fetch('/api/like')
    .then((r) => r.json())
    .then(paint)
    .catch(() => {});
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    try {
      const r = await fetch('/api/like', { method: 'POST' });
      if (r.ok) paint(await r.json());
    } catch {
      /* sin servidor */
    } finally {
      btn.disabled = false;
    }
  });
}

/* ----------------------------------------------------------------- Comentarios */
/* Persisten en el servidor (base de datos). Se comparten entre visitantes. */
function setupComments() {
  const form = $('[data-comment-form]');
  const list = $('[data-comment-list]');
  if (!form || !list) return;
  const empty = $('[data-comment-empty]', list);

  const fmtDate = (ts) =>
    new Date(ts).toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' });

  const node = (c) => {
    const el = document.createElement('article');
    el.className = 'comentario';
    const inicial = (c.name || '?').trim().charAt(0).toUpperCase() || '?';
    el.innerHTML =
      '<div class="comentario__top">' +
      '<span class="comentario__avatar"></span>' +
      '<div><p class="comentario__name"></p><p class="comentario__date"></p></div>' +
      '</div><p class="comentario__text"></p>';
    el.querySelector('.comentario__avatar').textContent = inicial;
    el.querySelector('.comentario__name').textContent = c.name;
    el.querySelector('.comentario__date').textContent = fmtDate(c.ts);
    el.querySelector('.comentario__text').textContent = c.body;
    return el;
  };

  const refresh = async () => {
    try {
      const r = await fetch('/api/comentarios');
      if (!r.ok) return;
      const { comentarios } = await r.json();
      $$('.comentario', list).forEach((n) => n.remove());
      if (empty) empty.style.display = comentarios.length ? 'none' : 'block';
      comentarios.forEach((c) => list.appendChild(node(c)));
    } catch {
      /* sin servidor */
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      const r = await fetch('/api/comentarios', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ nombre: form.nombre.value, texto: form.texto.value }),
      });
      if (r.ok) {
        form.reset();
        await refresh();
        refreshCounters();
      } else {
        const err = await r.json().catch(() => ({}));
        alert(err.error || 'No se pudo publicar el comentario.');
      }
    } catch {
      alert('No hay conexión con el servidor. Inténtalo de nuevo.');
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  refresh();
}

/* ------------------------------------------------- Captura de clicks (heatmap) */
function setupClickTracking() {
  const buffer = [];
  const docH = () => Math.max(document.documentElement.scrollHeight, window.innerHeight || 1);
  const sectionOf = (el) => {
    const sec = el && el.closest && el.closest('section[id], footer[id], header[id]');
    return sec ? sec.id || sec.tagName.toLowerCase() : null;
  };
  const flush = (useBeacon) => {
    if (!buffer.length) return;
    const payload = JSON.stringify({ clicks: buffer.splice(0, buffer.length) });
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  };
  const record = (clientX, clientY, target) => {
    buffer.push({
      path: location.pathname,
      x: +(clientX / (window.innerWidth || 1)).toFixed(4),
      y: +((window.scrollY + clientY) / docH()).toFixed(4),
      vw: window.innerWidth,
      vh: window.innerHeight,
      section: sectionOf(target),
      device: deviceType(),
    });
    if (buffer.length >= 12) flush(false);
  };
  window.addEventListener('pointerdown', (e) => record(e.clientX, e.clientY, e.target), {
    passive: true,
  });
  setInterval(() => flush(false), 5000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush(true);
  });
  window.addEventListener('pagehide', () => flush(true));
}
