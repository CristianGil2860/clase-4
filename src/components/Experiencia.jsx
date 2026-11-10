import Section, { Reveal } from "./Section.jsx";
import { experiencia } from "../data.js";

export default function Experiencia() {
  return (
    <Section id="experiencia" eyebrow="Trayectoria" titulo="Experiencia">
      <div className="timeline">
        {experiencia.map((e, i) => (
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
        ))}
      </div>
    </Section>
  );
}
