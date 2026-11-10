import Section, { Reveal } from "./Section.jsx";
import { skills } from "../data.js";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Stack"
      titulo="Tecnologías con las que trabajo"
      sub="Lo que uso a diario para llevar un sistema de la idea a producción."
    >
      <div className="skills-grid">
        {skills.map((g, i) => (
          <Reveal key={g.grupo} delay={i * 80}>
            <div className="skill-card">
              <h3>{g.grupo}</h3>
              <div className="chips">
                {g.items.map((it) => (
                  <span className="chip" key={it}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
