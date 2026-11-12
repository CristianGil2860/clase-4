/* ============================================================
   DATOS DE LA LANDING  —  editá SOLO este archivo
   Todo lo que se ve en la página sale de acá.
   ============================================================ */

/* ---------- Secciones del menú ----------
   Qué se muestra depende de si hay sesión abierta:
   sin sesión aparecen Ingresar y Registrarse; con sesión, desaparecen. */

export const SECCIONES_PUBLICAS = [
  { id: "sobre",       label: "Sobre mí" },
  { id: "skills",      label: "Tecnologías" },
  { id: "proyectos",   label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
];

export const SECCIONES_AUTH = [
  { id: "login",    label: "Ingresar" },
  { id: "registro", label: "Registrarse" },
];

export const SECCIONES_PRIVADAS = [
  { id: "panel",    label: "Panel",    privada: true },
  { id: "recursos", label: "Recursos", privada: true },
];

export const SECCION_CONTACTO = { id: "contacto", label: "Contacto" };

/* Las secciones en el mismo orden en que aparecen en la página.
   Nav la usa para los links y App para saber qué sección se está viendo. */
export function seccionesVisibles(logueado) {
  return [
    ...SECCIONES_PUBLICAS,
    ...(logueado ? [] : SECCIONES_AUTH),
    ...SECCIONES_PRIVADAS,
    SECCION_CONTACTO,
  ];
}

export const perfil = {
  nombre: "Cristian Gil",
  nombreCompleto: "Cristian Eduardo Gil",
  rol: "Desarrollador Web Full-Stack",
  ubicacion: "Córdoba, Argentina",
  disponible: true,
  disponibleTexto: "Disponible para proyectos",
  titular: "Construyo sistemas de gestión que la gente usa todos los días.",
  bajada:
    "Desarrollo aplicaciones web de punta a punta: desde el modelo de datos " +
    "hasta la interfaz. Especializado en PHP + MySQL, con front-end en JavaScript, " +
    "React y Angular. Trabajo sobre todo en sistemas para educación y gestión pública.",
  iniciales: "CG",
  foto: "", // poné acá la ruta a tu foto, ej: "/foto.jpg" (archivo en public/)
};

export const contacto = {
  email: "cristianeduardogil@gmail.com",
  github: "https://github.com/CristianGil2860",
  linkedin: "", // ej: "https://linkedin.com/in/tu-usuario"
  telefono: "", // ej: "+54 351 000 0000"
};

export const stats = [
  { valor: "15+",  etiqueta: "Sistemas en producción" },
  { valor: "8+",   etiqueta: "Años desarrollando" },
  { valor: "PHP",  etiqueta: "Stack principal" },
  { valor: "100%", etiqueta: "Proyectos propios" },
];

export const sobre = {
  titulo: "Sobre mí",
  parrafos: [
    "Soy desarrollador web y me dedico a transformar procesos manuales —planillas, " +
      "formularios en papel, cadenas de mails— en sistemas web que ordenan el trabajo " +
      "de equipos enteros.",

    "La mayor parte de mi trabajo son aplicaciones de gestión reales: inscripciones, " +
      "evaluaciones, legajos, notas, trámites y reportes. Eso me obliga a pensar en " +
      "validaciones, permisos por rol, exportación a Excel y PDF, y en que el sistema " +
      "siga funcionando cuando lo usan cien personas a la vez.",

    "Me manejo cómodo en todo el ciclo: diseño de base de datos, back-end, interfaz, " +
      "despliegue y soporte. Cuando hace falta, también migro sistemas viejos " +
      "(Google Apps Script, Excel, PHP legacy) a algo mantenible.",
  ],
  destacados: [
    "Modelado de bases de datos relacionales (MySQL / MariaDB)",
    "Interfaces responsive sin dependencias innecesarias",
    "Reportes y exportaciones a Excel y PDF",
    "Migración y rescate de sistemas legacy",
  ],
};

export const skills = [
  {
    grupo: "Back-end",
    items: ["PHP 7.4 / 8", "MySQL / MariaDB", "PDO", "APIs REST", "Python"],
  },
  {
    grupo: "Front-end",
    items: ["JavaScript (ES6+)", "React", "Angular", "HTML5 / CSS3", "Bootstrap 5"],
  },
  {
    grupo: "Herramientas",
    items: ["Git / GitHub", "Vite", "XAMPP / WAMP", "phpMyAdmin", "TCPDF"],
  },
  {
    grupo: "Integraciones",
    items: ["WhatsApp Cloud API", "API de Claude (IA)", "Login CIDI", "Google Apps Script"],
  },
];

export const proyectos = [
  {
    nombre: "Ofexterno",
    tipo: "Gestión pública",
    descripcion:
      "Sistema de oferentes externos con flujo de 13 pasos, evaluación final y " +
      "resoluciones. Migrado desde Google Apps Script a PHP + MySQL.",
    tags: ["PHP", "MySQL", "PDF"],
    destacado: true,
    url: "",
  },
  {
    nombre: "SistemaNotas",
    tipo: "Educación",
    descripcion:
      "Gestión académica multiescuela y multinivel (inicial, primario y secundario): " +
      "importación de datos, períodos y escalas por nivel, e informes de progreso.",
    tags: ["PHP", "MySQL", "Excel"],
    destacado: true,
    url: "",
  },
  {
    nombre: "WspIA",
    tipo: "Inteligencia artificial",
    descripcion:
      "Bot de WhatsApp con IA: responde consultas, interpreta fotos y PDF por visión, " +
      "y tiene panel con métricas, búsqueda y filtros en tiempo real.",
    tags: ["PHP", "WhatsApp API", "IA"],
    destacado: true,
    url: "",
  },
  {
    nombre: "Oferentes Internos",
    tipo: "Gestión pública",
    descripcion:
      "Migración a Angular de un sistema de oferentes internos, con API propia en PHP " +
      "y base de datos compartida en vivo con el sistema original.",
    tags: ["Angular", "PHP", "API REST"],
    url: "",
  },
  {
    nombre: "Tienda3D",
    tipo: "E-commerce",
    descripcion:
      "Tienda de impresión 3D con instalador web, catálogo, carrito y política de " +
      "seguridad de contenido estricta.",
    tags: ["PHP 8", "MySQL", "Seguridad"],
    url: "",
  },
  {
    nombre: "Catastro — Declaración Jurada",
    tipo: "Gestión pública",
    descripcion:
      "Generación de declaraciones juradas de mejoras en PDF con TCPDF, dibujando el " +
      "formulario oficial milímetro a milímetro.",
    tags: ["PHP", "TCPDF"],
    url: "",
  },
  {
    nombre: "GanaderíaApp",
    tipo: "Agro",
    descripcion:
      "Aplicación de gestión ganadera con router propio, desplegada en hosting " +
      "compartido sin acceso a consola.",
    tags: ["PHP 8", "MariaDB"],
    url: "",
  },
  {
    nombre: "Agenda Educación Córdoba",
    tipo: "Educación",
    descripcion:
      "Agenda institucional con roles de administrador y colaborador, importación " +
      "desde Excel, portada editable y publicación automática de solicitudes aprobadas.",
    tags: ["PHP", "Bootstrap 5"],
    url: "",
  },
];

export const experiencia = [
  {
    periodo: "2023 — hoy",
    puesto: "Desarrollador Full-Stack",
    lugar: "Proyectos para el sector educativo",
    detalle:
      "Diseño y desarrollo de sistemas de inscripción, evaluación y certificación " +
      "docente. Migración de procesos en planillas a aplicaciones web con base de datos.",
  },
  {
    periodo: "2021 — 2023",
    puesto: "Desarrollador Web",
    lugar: "Sistemas de gestión a medida",
    detalle:
      "Aplicaciones de gestión para organismos y pymes: legajos, trámites, reportes " +
      "y exportaciones. Mantenimiento y rescate de sistemas PHP legacy.",
  },
  {
    periodo: "2018 — 2021",
    puesto: "Desarrollador Junior / Freelance",
    lugar: "Independiente",
    detalle:
      "Sitios institucionales, formularios públicos y automatizaciones con Google " +
      "Apps Script y Excel.",
  },
];

/* ---------- Recursos de la sección privada ----------
   Si un recurso no tiene url, se muestra el texto de "accion" sin botón.
   Para ofrecer una descarga real: poné el archivo en public/ (por ejemplo
   public/cv.pdf) y escribí url: "/cv.pdf" con descarga: true. */
export const recursos = [
  {
    id: "cv",
    nombre: "CV completo en PDF",
    tipo: "Documento",
    descripcion:
      "La versión larga: cada sistema con su stack, el rol que tuve y qué problema " +
      "resolvía. Más detalle del que entra en la parte pública.",
    accion: "Pedir por correo",
    url: `mailto:${contacto.email}?subject=${encodeURIComponent("Pedido de CV completo")}`,
    descarga: true,
  },
  {
    id: "github",
    nombre: "Repositorios de los proyectos",
    tipo: "Código",
    descripcion:
      "El código de los sistemas que son públicos, para mirar cómo están armados " +
      "por dentro: estructura, consultas y manejo de permisos.",
    accion: "Ver en GitHub",
    url: contacto.github,
  },
  {
    id: "caso-notas",
    nombre: "Caso de estudio: SistemaNotas",
    tipo: "Caso de estudio",
    descripcion:
      "Cómo se modeló una gestión académica para varias escuelas y tres niveles a la " +
      "vez, con escalas de notas distintas por nivel y una importación que se " +
      "autodetecta por cabecera.",
    accion: "Te lo cuento en una llamada",
    url: "",
  },
  {
    id: "caso-wspia",
    nombre: "Caso de estudio: bot de WhatsApp con IA",
    tipo: "Caso de estudio",
    descripcion:
      "Qué hace falta para poner un bot con IA a atender gente de verdad: control " +
      "de costos, cortes de ritmo, contexto con caché y lectura de fotos y PDF.",
    accion: "Disponible a pedido",
    url: "",
  },
  {
    id: "plantillas-pdf",
    nombre: "Plantillas de PDF con TCPDF",
    tipo: "Código",
    descripcion:
      "Base para generar formularios oficiales dibujando con coordenadas, cuando el " +
      "HTML a PDF no alcanza porque el papel tiene que salir exacto.",
    accion: "Disponible a pedido",
    url: "",
  },
  {
    id: "esquema-trabajo",
    nombre: "Cómo trabajo y qué cobro",
    tipo: "Documento",
    descripcion:
      "Etapas, entregables, plazos típicos y formas de pago. Lo mando antes de " +
      "arrancar cualquier proyecto para que no haya sorpresas.",
    accion: "Pedir por correo",
    url: `mailto:${contacto.email}?subject=${encodeURIComponent("Consulta por esquema de trabajo")}`,
  },
];

export const contactoSeccion = {
  titulo: "Trabajemos juntos",
  bajada:
    "¿Tenés un proceso que hoy vive en planillas y querés convertirlo en un sistema? " +
    "Escribime y lo charlamos.",
};
