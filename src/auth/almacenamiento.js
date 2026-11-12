/* ============================================================
   Capa de datos de la autenticación: todo lo que toca localStorage.
   Acá no hay nada de React, así que se puede probar por separado.
   ------------------------------------------------------------
   OJO: esto es un ejercicio de front-end. Los usuarios quedan
   guardados en el navegador de cada visitante, así que NO es
   seguridad real: cualquiera puede abrir las DevTools y leer o
   editar los datos. Las contraseñas se guardan hasheadas con
   SHA-256 + salt para no dejarlas en texto plano, pero un
   sistema de verdad valida siempre en el servidor.
   ============================================================ */

export const CLAVE_USUARIOS = "landing.usuarios";
export const CLAVE_SESION = "landing.sesion";

export const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MIN_PASSWORD = 6;

/* ---------- lectura y escritura segura ---------- */

function leer(clave, porDefecto) {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? JSON.parse(crudo) : porDefecto;
  } catch {
    // modo privado, storage lleno o JSON corrupto
    return porDefecto;
  }
}

function escribir(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

/* ---------- hash de contraseñas ---------- */

function aHex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function nuevoSalt() {
  const cripto = globalThis.crypto;
  if (cripto?.getRandomValues) {
    return aHex(cripto.getRandomValues(new Uint8Array(16)));
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function hashear(password, salt) {
  const datos = new TextEncoder().encode(`${salt}:${password}`);
  const cripto = globalThis.crypto;

  if (cripto?.subtle) {
    const buffer = await cripto.subtle.digest("SHA-256", datos);
    return `sha256:${aHex(new Uint8Array(buffer))}`;
  }

  // Respaldo para contextos no seguros (http:// que no sea localhost),
  // donde el navegador no expone crypto.subtle.
  let h = 0x811c9dc5;
  for (const b of datos) {
    h ^= b;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `fnv1a:${h.toString(16)}`;
}

/* ---------- usuarios ---------- */

export function listarUsuarios() {
  const lista = leer(CLAVE_USUARIOS, []);
  return Array.isArray(lista) ? lista : [];
}

/* Devuelve el usuario sin el hash ni el salt: eso no circula por la app. */
export function aPublico(u) {
  return { nombre: u.nombre, email: u.email, creado: u.creado, datos: u.datos ?? {} };
}

export function normalizarEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export async function crearUsuario({ nombre, email, password }) {
  const limpio = normalizarEmail(email);
  const usuarios = listarUsuarios();

  if (usuarios.some((u) => u.email === limpio)) {
    return { ok: false, error: "Ya existe una cuenta con ese correo." };
  }

  const salt = nuevoSalt();
  const nuevo = {
    nombre: String(nombre).trim(),
    email: limpio,
    salt,
    hash: await hashear(password, salt),
    creado: new Date().toISOString(),
    datos: { notas: "", favoritos: [] },
  };

  if (!escribir(CLAVE_USUARIOS, [...usuarios, nuevo])) {
    return { ok: false, error: "No se pudo guardar: el navegador bloquea el almacenamiento." };
  }

  return { ok: true, usuario: aPublico(nuevo) };
}

export async function verificarCredenciales({ email, password }) {
  const limpio = normalizarEmail(email);
  const encontrado = listarUsuarios().find((u) => u.email === limpio);

  // Mismo mensaje para usuario inexistente y contraseña incorrecta:
  // así no se revela qué correos están registrados.
  const generico = "Correo o contraseña incorrectos.";
  if (!encontrado) return { ok: false, error: generico };

  const hash = await hashear(password, encontrado.salt);
  if (hash !== encontrado.hash) return { ok: false, error: generico };

  return { ok: true, usuario: aPublico(encontrado) };
}

/* Guarda datos propios del usuario (notas, favoritos) en su registro. */
export function actualizarDatos(email, parcial) {
  const limpio = normalizarEmail(email);
  let actualizado = null;

  const usuarios = listarUsuarios().map((u) => {
    if (u.email !== limpio) return u;
    actualizado = { ...u, datos: { ...(u.datos ?? {}), ...parcial } };
    return actualizado;
  });

  if (!actualizado) return null;

  escribir(CLAVE_USUARIOS, usuarios);
  return aPublico(actualizado);
}

/* ---------- sesión ---------- */

export function guardarSesion(email) {
  escribir(CLAVE_SESION, { email: normalizarEmail(email), desde: new Date().toISOString() });
}

export function leerSesion() {
  const sesion = leer(CLAVE_SESION, null);
  return sesion?.email ? sesion : null;
}

export function borrarSesion() {
  try {
    localStorage.removeItem(CLAVE_SESION);
  } catch {
    /* nada que hacer */
  }
}

/* Devuelve el usuario de la sesión guardada, o null si no hay o ya no existe. */
export function usuarioDeLaSesion() {
  const sesion = leerSesion();
  if (!sesion) return null;

  const encontrado = listarUsuarios().find((u) => u.email === sesion.email);
  return encontrado ? aPublico(encontrado) : null;
}
