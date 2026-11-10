/* Sección "Sobre mí": texto principal + tarjeta con lo que hago. */

function Sobre() {
  const sobre = window.DATA.sobre;

  return (
    <Section id="sobre" eyebrow="Perfil" titulo={sobre.titulo}>
      <div className="about-grid">
        <Reveal>
          <div className="about-text">
            {sobre.parrafos.map(function (p, i) {
              return <p key={i}>{p}</p>;
            })}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="card">
            <div className="card-title">En qué me especializo</div>
            <ul className="check-list">
              {sobre.destacados.map(function (d) {
                return (
                  <li key={d}>
                    <IconCheck />
                    <span>{d}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
