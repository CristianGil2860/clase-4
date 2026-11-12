import { useEffect, useState } from "react";
import { perfil } from "../data.js";
import { useAuth } from "../auth/AuthContext.jsx";
import {
  IconSun,
  IconMoon,
  IconMenu,
  IconClose,
  IconLock,
  IconUser,
  IconLogout,
} from "./Icons.jsx";

/* Barra de navegación: links con sección activa, cambio de tema,
   estado de la sesión y menú desplegable en pantallas chicas.
   Las secciones llegan por props porque cambian según haya sesión. */
export default function Nav({ tema, onCambiarTema, activa, secciones }) {
  const [abierto, setAbierto] = useState(false);
  const [scrolleado, setScrolleado] = useState(false);
  const { usuario, logueado, salir } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolleado(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const irA = (e, id) => {
    e.preventDefault();
    setAbierto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cerrarSesion = () => {
    setAbierto(false);
    salir();
  };

  return (
    <>
      <header className={"nav" + (scrolleado ? " is-scrolled" : "")}>
        <div className="wrap">
          <a className="brand" href="#inicio" onClick={(e) => irA(e, "inicio")}>
            <span className="brand-mark">{perfil.iniciales}</span>
            <span>{perfil.nombre}</span>
          </a>

          <nav className="nav-links" aria-label="Secciones">
            {secciones.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={activa === s.id ? "active" : ""}
                onClick={(e) => irA(e, s.id)}
              >
                {s.label}
                {/* candadito en las secciones privadas mientras no haya sesión */}
                {s.privada && !logueado && <IconLock size={13} />}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            {logueado && (
              <span className="sesion-chip" title={usuario.email}>
                <IconUser size={15} />
                <span className="sesion-nombre">{usuario.nombre.split(" ")[0]}</span>
              </span>
            )}

            {logueado && (
              <button
                className="icon-btn"
                onClick={cerrarSesion}
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <IconLogout size={18} />
              </button>
            )}

            <button
              className="icon-btn"
              onClick={onCambiarTema}
              aria-label={tema === "dark" ? "Activar tema claro" : "Activar tema oscuro"}
              title={tema === "dark" ? "Tema claro" : "Tema oscuro"}
            >
              {tema === "dark" ? <IconSun /> : <IconMoon />}
            </button>

            <button
              className="icon-btn nav-toggle"
              onClick={() => setAbierto((v) => !v)}
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={abierto}
            >
              {abierto ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {abierto && (
        <div className="nav-mobile">
          {secciones.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={(e) => irA(e, s.id)}>
              {s.label}
              {s.privada && !logueado && <IconLock size={13} />}
            </a>
          ))}

          {logueado && (
            <button className="nav-mobile-salir" onClick={cerrarSesion}>
              <IconLogout size={18} /> Cerrar sesión ({usuario.nombre.split(" ")[0]})
            </button>
          )}
        </div>
      )}
    </>
  );
}
