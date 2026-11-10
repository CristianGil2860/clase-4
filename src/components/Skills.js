/* Sección de tecnologías, agrupadas por tipo. */

function Skills() {
  const skills = window.DATA.skills;

  return (
    <Section
      id="skills"
      eyebrow="Stack"
      titulo="Tecnologías con las que trabajo"
      sub="Lo que uso a diario para llevar un sistema de la idea a producción."
    >
      <div className="skills-grid">
        {skills.map(function (g, i) {
          return (
            <Reveal key={g.grupo} delay={i * 80}>
              <div className="skill-card">
                <h3>{g.grupo}</h3>
                <div className="chips">
                  {g.items.map(function (it) {
                    return (
                      <span className="chip" key={it}>
                        {it}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
