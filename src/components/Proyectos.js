/* Sección de proyectos con filtro por tipo (estado en React). */

function Proyectos() {
  const proyectos = window.DATA.proyectos;
  const [filtro, setFiltro] = React.useState("Todos");

  const tipos = React.useMemo(function () {
    const unicos = [];
    proyectos.forEach(function (p) {
      if (unicos.indexOf(p.tipo) === -1) unicos.push(p.tipo);
    });
    return ["Todos"].concat(unicos);
  }, [proyectos]);

  const visibles = proyectos.filter(function (p) {
    return filtro === "Todos" || p.tipo === filtro;
  });

  return (
    <Section
      id="proyectos"
      eyebrow="Trabajo"
      titulo="Proyectos"
      sub="Sistemas reales, en uso. Filtrá por rubro para ver cada grupo."
    >
      <Reveal>
        <div className="filters" role="group" aria-label="Filtrar proyectos por rubro">
          {tipos.map(function (t) {
            return (
              <button
                key={t}
                className={"filter" + (filtro === t ? " active" : "")}
                onClick={function () { setFiltro(t); }}
                aria-pressed={filtro === t}
              >
                {t}
                {t !== "Todos" && (
                  <span style={{ opacity: 0.6, marginLeft: 6 }}>
                    {proyectos.filter(function (p) { return p.tipo === t; }).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      {visibles.length === 0 ? (
        <p className="empty">No hay proyectos en este rubro todavía.</p>
      ) : (
        <div className="projects">
          {visibles.map(function (p, i) {
            const contenido = (
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
                  {p.tags.map(function (t) {
                    return (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    );
                  })}
                </div>
              </article>
            );

            return (
              <Reveal key={p.nombre} delay={Math.min(i, 5) * 70}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {contenido}
                  </a>
                ) : (
                  contenido
                )}
              </Reveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}
