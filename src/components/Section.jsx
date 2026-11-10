import { useEffect, useRef, useState } from "react";

/* Aparición al hacer scroll, con IntersectionObserver. */
export function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={"reveal" + (visible ? " in" : "")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* Envoltorio común de cada sección: id para el menú + encabezado. */
export default function Section({ id, eyebrow, titulo, sub, children }) {
  return (
    <section className="section" id={id}>
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 className="section-title">{titulo}</h2>
            {sub && <p className="section-sub">{sub}</p>}
          </div>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
