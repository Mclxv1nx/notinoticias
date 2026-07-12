// Declaraciones de tipos para el contenido del reportaje (reportaje.js).
// Da tipado a todos los componentes que importan de este módulo y evita los
// errores del editor: 2307 (cannot find module), 7006 (implicit any) y 7053.

export interface Site {
  titulo: string;
  subtitulo: string;
  kicker: string;
  autora: string;
  rol: string;
  ubicacion: string;
  anio: number;
  intro: string;
}

export interface NavItem {
  id: string;
  etiqueta: string;
}

export interface Bloque {
  titulo: string;
  parrafos: string[];
  imagen: string;
  credito: string;
}

export interface Reportaje {
  titulo: string;
  entradilla: string;
  bloques: Bloque[];
}

export interface Artesano {
  numero: number;
  nombre: string;
  titular: string;
  trayectoria: number | null;
  imagen: string;
  resumen: string;
  videoId: string;
  videoUrl: string;
}

export interface GaleriaItem {
  src: string;
  alt: string;
  caption: string;
}

export interface Contador {
  valor: number;
  sufijo: string;
  etiqueta: string;
  detalle: string;
}

export interface Trayectoria {
  nombre: string;
  anios: number;
}

export interface Estadisticas {
  nota: string;
  contadores: Contador[];
  trayectorias: Trayectoria[];
}

export interface Proyecto {
  proposito: string;
  objetivos: string[];
  metodologia: string;
  autora: string;
}

export interface FuenteEntrevista {
  etiqueta: string;
  titulo: string;
  url: string;
}

export interface FuenteOtra {
  texto: string;
  url: string | null;
}

export interface Fuentes {
  entrevistas: FuenteEntrevista[];
  otras: FuenteOtra[];
}

export interface Red {
  nombre: string;
  url: string;
  icono: string;
}

export interface Contacto {
  email: string;
  mensaje: string;
  redes: Red[];
}

export const site: Site;
export const navegacion: NavItem[];
export const reportaje: Reportaje;
export const artesanos: Artesano[];
export const galeria: GaleriaItem[];
export const estadisticas: Estadisticas;
export const proyecto: Proyecto;
export const fuentes: Fuentes;
export const contacto: Contacto;
