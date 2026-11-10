import { useEffect, useState } from "react";
import { perfil, SECCIONES } from "../data.js";
import { IconSun, IconMoon, IconMenu, IconClose } from "./Icons.jsx";

/* Barra de navegación: links con sección activa, cambio de tema
   y menú desplegable en pantallas chicas. */
export default function Nav({ tema, onCambiarTema, activa }) {
  const [abierto, setAbierto] = useState(false);
  const [scrolleado, setScrolleado] = useState(false);

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

  return (
    <>
      <header className={"nav" + (scrolleado ? " is-scrolled" : "")}>
        <div className="wrap">
          <a className="brand" href="#inicio" onClick={(e) => irA(e, "inicio")}>
            <span className="brand-mark">{perfil.iniciales}</span>
            <span>{perfil.nombre}</span>
          </a>

          <nav className="nav-links" aria-label="Secciones">
            {SECCIONES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={activa === s.id ? "active" : ""}
                onClick={(e) => irA(e, s.id)}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
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
          {SECCIONES.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={(e) => irA(e, s.id)}>
              {s.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
