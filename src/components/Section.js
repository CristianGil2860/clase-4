/* Piezas reutilizables: aparición al hacer scroll (IntersectionObserver)
   y el envoltorio común de cada sección. */

function Reveal(props) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(function () {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);

  return (
    <div
      ref={ref}
      className={"reveal" + (visible ? " in" : "")}
      style={{ transitionDelay: (props.delay || 0) + "ms" }}
    >
      {props.children}
    </div>
  );
}

function Section(props) {
  return (
    <section className="section" id={props.id}>
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            {props.eyebrow && <span className="eyebrow">{props.eyebrow}</span>}
            <h2 className="section-title">{props.titulo}</h2>
            {props.sub && <p className="section-sub">{props.sub}</p>}
          </div>
        </Reveal>
        {props.children}
      </div>
    </section>
  );
}
