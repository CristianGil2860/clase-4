/* Línea de tiempo laboral. */

function Experiencia() {
  const items = window.DATA.experiencia;

  return (
    <Section id="experiencia" eyebrow="Trayectoria" titulo="Experiencia">
      <div className="timeline">
        {items.map(function (e, i) {
          return (
            <Reveal key={e.periodo + e.puesto} delay={i * 90}>
              <div className="tl-item">
                <div className="tl-period mono">{e.periodo}</div>
                <div className="tl-body">
                  <h3>{e.puesto}</h3>
                  <div className="tl-place">{e.lugar}</div>
                  <p className="tl-detail">{e.detalle}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
