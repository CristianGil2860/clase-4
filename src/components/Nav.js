/* Barra de navegación: links con sección activa, cambio de tema
   y menú desplegable en pantallas chicas. */

window.SECCIONES = [
  { id: "sobre",        label: "Sobre mí" },
  { id: "skills",       label: "Tecnologías" },
  { id: "proyectos",    label: "Proyectos" },
  { id: "experiencia",  label: "Experiencia" },
  { id: "contacto",     label: "Contacto" },
];

function Nav(props) {
  const { tema, onCambiarTema, activa } = props;
  const [abierto, setAbierto] = React.useState(false);
  const [scrolleado, setScrolleado] = React.useState(false);
  const perfil = window.DATA.perfil;

  React.useEffect(function () {
    function onScroll() {
      setScrolleado(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function irA(e, id) {
    e.preventDefault();
    setAbierto(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <React.Fragment>
      <header className={"nav" + (scrolleado ? " is-scrolled" : "")}>
        <div className="wrap">
          <a className="brand" href="#inicio" onClick={function (e) { irA(e, "inicio"); }}>
            <span className="brand-mark">{perfil.iniciales}</span>
            <span>{perfil.nombre}</span>
          </a>

          <nav className="nav-links" aria-label="Secciones">
            {window.SECCIONES.map(function (s) {
              return (
                <a
                  key={s.id}
                  href={"#" + s.id}
                  className={activa === s.id ? "active" : ""}
                  onClick={function (e) { irA(e, s.id); }}
                >
                  {s.label}
                </a>
              );
            })}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={onCambiarTema}
              aria-label={tema === "dark" ? "Activar tema claro" : "Activar tema oscuro"}
              title={tema === "dark" ? "Tema claro" : "Tema oscuro"}
            >
              {tema === "dark" ? <IconSun /> : <IconMoon />}
            </button>

            <button
              className="icon-btn nav-toggle"
              onClick={function () { setAbierto(!abierto); }}
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={abierto}
            >
              {abierto ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {abierto && (
        <div className="nav-mobile">
          {window.SECCIONES.map(function (s) {
            return (
              <a key={s.id} href={"#" + s.id} onClick={function (e) { irA(e, s.id); }}>
                {s.label}
              </a>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}
