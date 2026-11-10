/* Componente raíz: arma la página, guarda el tema elegido
   y marca en el menú la sección que se está viendo. */

function useTema() {
  const [tema, setTema] = React.useState(function () {
    let guardado = null;
    try {
      guardado = localStorage.getItem("tema");
    } catch (e) {
      guardado = null;
    }
    if (guardado === "dark" || guardado === "light") return guardado;

    const oscuroSistema =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return oscuroSistema ? "dark" : "light";
  });

  React.useEffect(function () {
    document.documentElement.setAttribute("data-theme", tema);
    try {
      localStorage.setItem("tema", tema);
    } catch (e) {
      /* modo privado o storage bloqueado: no pasa nada */
    }
  }, [tema]);

  function cambiar() {
    setTema(tema === "dark" ? "light" : "dark");
  }

  return [tema, cambiar];
}

function useSeccionActiva() {
  const [activa, setActiva] = React.useState("");

  React.useEffect(function () {
    const ids = window.SECCIONES.map(function (s) { return s.id; });

    function calcular() {
      let actual = "";
      ids.forEach(function (id) {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= 140) actual = id;
      });
      setActiva(actual);
    }

    calcular();
    window.addEventListener("scroll", calcular, { passive: true });
    window.addEventListener("resize", calcular);
    return function () {
      window.removeEventListener("scroll", calcular);
      window.removeEventListener("resize", calcular);
    };
  }, []);

  return activa;
}

function App() {
  const temaHook = useTema();
  const tema = temaHook[0];
  const cambiarTema = temaHook[1];
  const activa = useSeccionActiva();

  return (
    <React.Fragment>
      <Nav tema={tema} onCambiarTema={cambiarTema} activa={activa} />
      <main>
        <Hero />
        <Sobre />
        <Skills />
        <Proyectos />
        <Experiencia />
        <Contacto />
      </main>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
