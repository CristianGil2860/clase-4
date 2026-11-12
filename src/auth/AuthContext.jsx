import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CLAVE_SESION,
  actualizarDatos,
  borrarSesion,
  crearUsuario,
  guardarSesion,
  usuarioDeLaSesion,
  verificarCredenciales,
} from "./almacenamiento.js";

/* Estado de la sesión para toda la app.
   La parte que toca localStorage vive en almacenamiento.js;
   acá sólo está el estado de React y los avisos a los componentes. */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Al arrancar recupera la sesión guardada, si la hay.
  const [usuario, setUsuario] = useState(() => usuarioDeLaSesion());
  const [cargando, setCargando] = useState(false);

  // Si la página está abierta en dos pestañas, la sesión se mantiene
  // sincronizada: el evento "storage" avisa a las demás pestañas.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== CLAVE_SESION) return;
      setUsuario(usuarioDeLaSesion());
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  async function registrar({ nombre, email, password }) {
    setCargando(true);
    try {
      const resultado = await crearUsuario({ nombre, email, password });
      if (!resultado.ok) return resultado;

      guardarSesion(resultado.usuario.email);
      setUsuario(resultado.usuario);
      return { ok: true };
    } finally {
      setCargando(false);
    }
  }

  async function ingresar({ email, password }) {
    setCargando(true);
    try {
      const resultado = await verificarCredenciales({ email, password });
      if (!resultado.ok) return resultado;

      guardarSesion(resultado.usuario.email);
      setUsuario(resultado.usuario);
      return { ok: true };
    } finally {
      setCargando(false);
    }
  }

  function salir() {
    borrarSesion();
    setUsuario(null);
  }

  /* Guarda datos propios del usuario (notas, favoritos). */
  function guardarDatos(parcial) {
    if (!usuario) return;

    const actualizado = actualizarDatos(usuario.email, parcial);
    if (actualizado) setUsuario(actualizado);
  }

  const valor = useMemo(
    () => ({
      usuario,
      logueado: Boolean(usuario),
      cargando,
      registrar,
      ingresar,
      salir,
      guardarDatos,
    }),
    [usuario, cargando]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

/* Hook para consumir el contexto desde cualquier componente. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth se tiene que usar dentro de <AuthProvider>.");
  return ctx;
}

/* Reexportadas para que los formularios validen con las mismas reglas. */
export { RE_EMAIL, MIN_PASSWORD } from "./almacenamiento.js";
