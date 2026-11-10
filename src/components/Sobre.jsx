import Section, { Reveal } from "./Section.jsx";
import { sobre } from "../data.js";
import { IconCheck } from "./Icons.jsx";

export default function Sobre() {
  return (
    <Section id="sobre" eyebrow="Perfil" titulo={sobre.titulo}>
      <div className="about-grid">
        <Reveal>
          <div className="about-text">
            {sobre.parrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="card">
            <div className="card-title">En qué me especializo</div>
            <ul className="check-list">
              {sobre.destacados.map((d) => (
                <li key={d}>
                  <IconCheck />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
