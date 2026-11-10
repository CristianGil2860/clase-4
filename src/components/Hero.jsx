import { useEffect, useState } from "react";
import { perfil, contacto, stats } from "../data.js";
import { IconPin, IconArrow, IconGithub } from "./Icons.jsx";

/* Hook propio: muestra el texto letra por letra. */
function useTipeo(texto, velocidad = 28) {
  const [visible, setVisible] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(texto);
      return;
    }

    let i = 0;
    setVisible("");
    const id = setInterval(() => {
      i += 1;
      setVisible(texto.slice(0, i));
      if (i >= texto.length) clearInterval(id);
    }, velocidad);

    return () => clearInterval(id);
  }, [texto, velocidad]);

  return visible;
}

export default function Hero() {
  const titular = useTipeo(perfil.titular, 26);
  const escribiendo = titular.length < perfil.titular.length;

  const irA = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="inicio">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            {perfil.disponible && (
              <span className="badge">
                <span className="dot" />
                {perfil.disponibleTexto}
              </span>
            )}

            <h1>
              Hola, soy <span className="grad">{perfil.nombre}</span>.
            </h1>

            <div className="hero-role">
              <span>{perfil.rol}</span>
              <span className="sep">/</span>
              <span className="loc">
                <IconPin /> {perfil.ubicacion}
              </span>
            </div>

            <p className="hero-text mono" style={{ minHeight: "3.2em" }}>
              {titular}
              <span style={{ opacity: escribiendo ? 1 : 0 }}>|</span>
            </p>

            <p className="hero-text">{perfil.bajada}</p>

            <div className="hero-cta">
              <a className="btn btn-primary" href="#contacto" onClick={(e) => irA(e, "contacto")}>
                Contactame <IconArrow />
              </a>

              <a className="btn btn-ghost" href="#proyectos" onClick={(e) => irA(e, "proyectos")}>
                Ver proyectos
              </a>

              {contacto.github && (
                <a
                  className="btn btn-ghost"
                  href={contacto.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconGithub size={18} /> GitHub
                </a>
              )}
            </div>
          </div>

          <div className="avatar">
            {perfil.foto ? (
              <img src={perfil.foto} alt={`Foto de ${perfil.nombreCompleto}`} />
            ) : (
              <span className="initials">{perfil.iniciales}</span>
            )}
          </div>
        </div>

        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.etiqueta}>
              <div className="stat-value">{s.valor}</div>
              <div className="stat-label">{s.etiqueta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
