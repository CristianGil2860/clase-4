import { useMemo, useState } from "react";
import Section, { Reveal } from "./Section.jsx";
import { proyectos } from "../data.js";
import { IconStar } from "./Icons.jsx";

export default function Proyectos() {
  const [filtro, setFiltro] = useState("Todos");

  // Los rubros se calculan a partir de los datos: si agregás un proyecto
  // con un tipo nuevo, el botón del filtro aparece solo.
  const tipos = useMemo(
    () => ["Todos", ...new Set(proyectos.map((p) => p.tipo))],
    []
  );

  const visibles = proyectos.filter((p) => filtro === "Todos" || p.tipo === filtro);

  return (
    <Section
      id="proyectos"
      eyebrow="Trabajo"
      titulo="Proyectos"
      sub="Sistemas reales, en uso. Filtrá por rubro para ver cada grupo."
    >
      <Reveal>
        <div className="filters" role="group" aria-label="Filtrar proyectos por rubro">
          {tipos.map((t) => (
            <button
              key={t}
              className={"filter" + (filtro === t ? " active" : "")}
              onClick={() => setFiltro(t)}
              aria-pressed={filtro === t}
            >
              {t}
              {t !== "Todos" && (
                <span style={{ opacity: 0.6, marginLeft: 6 }}>
                  {proyectos.filter((p) => p.tipo === t).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </Reveal>

      {visibles.length === 0 ? (
        <p className="empty">No hay proyectos en este rubro todavía.</p>
      ) : (
        <div className="projects">
          {visibles.map((p, i) => {
            const tarjeta = (
              <article className="project">
                <div className="project-top">
                  <span className="project-type">{p.tipo}</span>
                  {p.destacado && (
                    <span className="star" title="Proyecto destacado">
                      <IconStar />
                    </span>
                  )}
                </div>

                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>

                <div className="chips">
                  {p.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );

            return (
              <Reveal key={p.nombre} delay={Math.min(i, 5) * 70}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {tarjeta}
                  </a>
                ) : (
                  tarjeta
                )}
              </Reveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}
