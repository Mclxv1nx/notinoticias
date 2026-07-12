/**
 * =============================================================================
 *  CONTENIDO DEL REPORTAJE  —  "San Antonio de Ibarra: el alma tallada en madera"
 * =============================================================================
 *  Este es el ÚNICO archivo que necesitas editar para cambiar los textos, datos
 *  e imágenes del sitio. Los componentes de /src/components leen de aquí.
 *
 *  Los textos marcados con  // ← reemplazar  son PLACEHOLDERS pensados para que
 *  los sustituyas con la información de las entrevistas en video.
 * =============================================================================
 */

/* ----------------------------------------------------------------------------
 * Datos generales del sitio
 * -------------------------------------------------------------------------- */
export const site = {
  titulo: 'El alma tallada en madera',
  subtitulo: 'Un reportaje sobre los maestros artesanos de San Antonio de Ibarra',
  kicker: 'Reportaje · Patrimonio vivo del Ecuador',
  autora: 'notinoticias',
  rol: 'Investigación, entrevistas y fotografía',
  ubicacion: 'San Antonio de Ibarra · Imbabura · Ecuador',
  anio: 2026,
  // Introducción breve que invita a descubrir la historia (portada).
  intro:
    'En las calles de San Antonio de Ibarra, el sonido de la gubia sobre la madera ' +
    'no se ha apagado en más de un siglo. Este reportaje recorre los talleres y las ' +
    'manos que sostienen una de las tradiciones artísticas más importantes del Ecuador.', // ← reemplazar
};

/* ----------------------------------------------------------------------------
 * Menú de navegación (ancla a cada sección)
 * -------------------------------------------------------------------------- */
export const navegacion = [
  { id: 'inicio', etiqueta: 'Inicio' },
  { id: 'reportaje', etiqueta: 'Reportaje' },
  { id: 'multimedia', etiqueta: 'Multimedia' },
  { id: 'estadisticas', etiqueta: 'Datos' },
  { id: 'proyecto', etiqueta: 'El proyecto' },
  { id: 'fuentes', etiqueta: 'Fuentes' },
  { id: 'contacto', etiqueta: 'Contacto' },
];

/* ----------------------------------------------------------------------------
 * Cuerpo del reportaje  (bloques de texto + imágenes de apoyo)
 * Cada bloque: { titulo, parrafos:[], imagen?, credito? }
 * -------------------------------------------------------------------------- */
export const reportaje = {
  titulo: 'El oficio que talló un pueblo',
  entradilla:
    'San Antonio de Ibarra es sinónimo de escultura en madera. Detrás de cada ' +
    'figura hay generaciones de maestros que aprendieron el oficio en el taller ' +
    'familiar y hoy enfrentan el reto de mantenerlo vivo.', // ← reemplazar
  bloques: [
    {
      titulo: 'Un origen labrado a mano',
      parrafos: [
        'La tradición del tallado en San Antonio de Ibarra se remonta a más de un ' +
          'siglo, cuando los primeros talleres comenzaron a producir imaginería ' +
          'religiosa para iglesias de toda la región.', // ← reemplazar
        'Con el tiempo, el oficio se diversificó: de los santos y vírgenes se pasó a ' +
          'figuras costumbristas, retratos y piezas de gran formato que hoy decoran ' +
          'plazas y hogares.', // ← reemplazar
      ],
      imagen: '/images/estatuas-madera.jpg',
      credito: 'Esculturas en el parque central de San Antonio de Ibarra.',
    },
    {
      titulo: 'Las manos que sostienen la tradición',
      parrafos: [
        'Los maestros entrevistados coinciden en algo: el tallado no se aprende en un ' +
          'aula, sino observando y repitiendo junto a quien ya domina la gubia.', // ← reemplazar
        'Muchos empezaron siendo niños, barriendo el aserrín del taller de su padre o ' +
          'su abuelo, hasta que un día les entregaron la primera herramienta.', // ← reemplazar
      ],
      imagen: '/images/escultura-colega.jpg',
      credito: 'Reportero del grupo mostrando una artesanía.',
    },
    {
      titulo: 'El desafío de mantenerlo vivo',
      parrafos: [
        'Hoy el oficio compite con la producción industrial y con el desinterés de las ' +
          'nuevas generaciones. Aun así, los talleres siguen abiertos.', // ← reemplazar
        'Este reportaje reúne cinco voces —cinco maestros— que explican, con sus ' +
          'propias palabras, por qué la madera sigue siendo su forma de entender el mundo.', // ← reemplazar
      ],
      imagen: '/images/stand-artesania.jpg',
      credito: 'Stand de artesanías de madera en San Antonio de Ibarra.',
    },
  ],
};

/* ----------------------------------------------------------------------------
 * Los cinco maestros (una tarjeta + video por entrevista)
 * videoId = ID de YouTube del enlace que proporcionaste.
 * -------------------------------------------------------------------------- */
export const artesanos = [
  {
    numero: 1,
    nombre: 'Freddy Antonio Osorio Rodríguez',
    titular: 'El legado del arte artesanal en San Antonio',
    trayectoria: null, // años de trayectoria (si se conoce) ← reemplazar
    imagen: '/images/freddy-osorio.jpg',
    resumen:
      'Habla del valor del arte artesanal y de lo que significa heredar y transmitir ' +
      'el oficio a las siguientes generaciones.', // ← reemplazar
    videoId: 'SogkaixNFmE',
    videoUrl: 'https://www.youtube.com/watch?v=SogkaixNFmE',
  },
  {
    numero: 2,
    nombre: 'Luis Emiliano Praire Martínez',
    titular: '45 años de historia y pasión por la madera',
    trayectoria: 45,
    imagen: '/images/luis-praire.jpg',
    resumen:
      'Cuenta cómo, tras más de cuatro décadas frente al banco de trabajo, la pasión ' +
      'por la madera sigue intacta.', // ← reemplazar
    videoId: '2o5nV2M6IBQ',
    videoUrl: 'https://www.youtube.com/watch?v=2o5nV2M6IBQ',
  },
  {
    numero: 3,
    nombre: 'Mesías Solano',
    titular: 'El tallado en madera y el desafío de mantener viva una tradición',
    trayectoria: null, // ← reemplazar
    imagen: '/images/mesias-solano.jpg',
    resumen:
      'Reflexiona sobre las dificultades de sostener el oficio hoy y sobre lo que hace ' +
      'falta para que la tradición no desaparezca.', // ← reemplazar
    videoId: 'MEEqIcFWqj4',
    videoUrl: 'https://www.youtube.com/watch?v=MEEqIcFWqj4',
  },
  {
    numero: 4,
    nombre: 'Luis Guillermo Ibadango Potosí',
    titular: '50 años de historia y el legado en madera',
    trayectoria: 50,
    imagen: '/images/guillermo-ibadango.jpg',
    resumen:
      'Medio siglo de trabajo resumido en las piezas que han salido de su taller y en ' +
      'el legado que deja a su familia.', // ← reemplazar
    videoId: '18KRcb4GKio',
    videoUrl: 'https://www.youtube.com/watch?v=18KRcb4GKio',
  },
  {
    numero: 5,
    nombre: 'Álvaro Garrido',
    titular: 'La pasión por la escultura y el legado artístico de San Antonio',
    trayectoria: null, // ← reemplazar
    imagen: '/images/alvaro-garrido.jpg',
    resumen:
      'Desde la escultura, defiende el valor artístico del pueblo y su lugar en la ' +
      'historia cultural del Ecuador.', // ← reemplazar
    videoId: 'Tsyqhgc22fU',
    videoUrl: 'https://www.youtube.com/watch?v=Tsyqhgc22fU',
  },
];

/* ----------------------------------------------------------------------------
 * Galería fotográfica  (contenido multimedia)
 * -------------------------------------------------------------------------- */
export const galeria = [
  { src: '/images/anahi-principal.jpg', alt: 'Reportera del grupo notinoticias sostiene una escultura de madera tallada.', caption: 'La imaginería religiosa sigue siendo el sello de San Antonio.' },
  { src: '/images/escena-1.jpg', alt: 'Escena de San Antonio de Ibarra.', caption: 'El pueblo, entre talleres y galerías.' }, // ← revisar caption
  { src: '/images/escena-2.jpg', alt: 'Escena de San Antonio de Ibarra.', caption: 'Cada esquina exhibe el trabajo de sus artesanos.' }, // ← revisar caption
  { src: '/images/escena-3.jpg', alt: 'Escena de San Antonio de Ibarra.', caption: 'La madera convertida en identidad.' }, // ← revisar caption
  { src: '/images/estatuas-madera.jpg', alt: 'Grandes esculturas de madera en la plaza.', caption: 'Figuras monumentales en el parque central.' },
  { src: '/images/stand-artesanias-2.jpg', alt: 'Stand de artesanías de madera.', caption: 'Galerías y stands abiertos al visitante.' },
  { src: '/images/stand-artesania.jpg', alt: 'Piezas de artesanía en madera.', caption: 'Del santo religioso a la figura decorativa.' },
  { src: '/images/escultura-colega.jpg', alt: 'Reportero del grupo mostrando una artesanía de madera.', caption: 'Reportero del grupo mostrando una artesanía.' },
];

/* ----------------------------------------------------------------------------
 * Estadísticas e infografías  (DATOS ILUSTRATIVOS — reemplázalos con cifras reales)
 * -------------------------------------------------------------------------- */
export const estadisticas = {
  nota: 'Cifras que resumen la fuerza de la tradición del tallado en San Antonio de Ibarra.',
  contadores: [
    { valor: 100, sufijo: '+', etiqueta: 'años de tradición', detalle: 'El oficio se transmite en el pueblo desde hace más de un siglo.' }, // ← reemplazar
    { valor: 5, sufijo: '', etiqueta: 'maestros entrevistados', detalle: 'Cinco voces que sostienen el oficio hoy.' },
    { valor: 5, sufijo: '', etiqueta: 'generaciones de talladores', detalle: 'El saber pasa de padres a hijos.' }, // ← reemplazar
    { valor: 70, sufijo: '%', etiqueta: 'talleres de origen familiar', detalle: 'La mayoría de los talleres nace dentro de una familia.' }, // ← reemplazar
  ],
  // Infografía de barras: años de trayectoria por maestro (los null usan un valor de referencia).
  trayectorias: [
    { nombre: 'Luis G. Ibadango', anios: 50 },
    { nombre: 'Luis Praire', anios: 45 },
    { nombre: 'Freddy Osorio', anios: 30 }, // ← reemplazar con dato real
    { nombre: 'Mesías Solano', anios: 28 }, // ← reemplazar con dato real
    { nombre: 'Álvaro Garrido', anios: 25 }, // ← reemplazar con dato real
  ],
};

/* ----------------------------------------------------------------------------
 * Sobre el proyecto
 * -------------------------------------------------------------------------- */
export const proyecto = {
  proposito:
    'Este reportaje busca documentar y difundir la tradición del tallado en madera de ' +
    'San Antonio de Ibarra a través de la voz directa de sus artesanos.', // ← reemplazar
  objetivos: [
    'Registrar el testimonio de cinco maestros talladores del pueblo.', // ← reemplazar
    'Poner en valor el oficio como patrimonio cultural vivo del Ecuador.', // ← reemplazar
    'Acercar la tradición a un público joven mediante formatos digitales.', // ← reemplazar
  ],
  metodologia:
    'La investigación se basó en entrevistas en profundidad grabadas en video, ' +
    'realizadas en los propios talleres, complementadas con registro fotográfico ' +
    'y documentación de contexto.', // ← reemplazar
  autora:
    'notinoticias es el grupo de trabajo detrás de esta investigación: realizó las ' +
    'entrevistas, la fotografía y la edición del reportaje.',
};

/* ----------------------------------------------------------------------------
 * Fuentes y referencias
 * -------------------------------------------------------------------------- */
export const fuentes = {
  entrevistas: artesanos.map((a) => ({
    etiqueta: `Entrevista N.º ${a.numero} — ${a.nombre}`,
    titulo: a.titular,
    url: a.videoUrl,
  })),
  otras: [
    { texto: 'Documentación de contexto sobre San Antonio de Ibarra.', url: null }, // ← reemplazar
    { texto: 'Bibliografía y artículos consultados.', url: null }, // ← reemplazar
  ],
};

/* ----------------------------------------------------------------------------
 * Contacto y redes sociales
 * -------------------------------------------------------------------------- */
export const contacto = {
  // Correo interno de referencia (no se muestra en el sitio). Momentáneo.
  email: 'gachanterap@utn.edu.ec',
  mensaje: 'Sigue el trabajo de notinoticias y descubre más historias en nuestras redes:',
  redes: [
    { nombre: 'YouTube', url: 'https://www.youtube.com/@notinoticias-r5z', icono: 'youtube' },
    { nombre: 'Instagram', url: 'https://www.instagram.com/notiinoticias/', icono: 'instagram' },
    // TikTok: aún no hay cuenta. Cuando exista, agrega aquí:
    // { nombre: 'TikTok', url: 'https://www.tiktok.com/@tu_usuario', icono: 'tiktok' },
  ],
};
