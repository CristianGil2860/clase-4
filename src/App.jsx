import { useState, useEffect } from "react";

import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Sobre from "./components/Sobre.jsx";
import Skills from "./components/Skills.jsx";
import Proyectos from "./components/Proyectos.jsx";
import Experiencia from "./components/Experiencia.jsx";
import Contacto from "./components/Contacto.jsx";
import Footer from "./components/Footer.jsx";
import { SECCIONES } from "./data.js";

/* Hook propio: guarda el tema elegido y lo recuerda entre visitas. */
function useTema() {
  const [tema, setTema] = useState(() => {
    let guardado = null;
    try {
      guardado = localStorage.getItem("tema");
    } catch {
      guardado = null;
    }
    if (guardado === "dark" || guardado === "light") return guardado;

    const oscuroSistema =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return oscuroSistema ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    try {
      localStorage.setItem("tema", tema);
    } catch {
      /* modo privado o storage bloqueado: no pasa nada */
    }
  }, [tema]);

  const cambiarTema = () => setTema((t) => (t === "dark" ? "light" : "dark"));

  return [tema, cambiarTema];
}

/* Hook propio: devuelve el id de la sección que se está viendo. */
function useSeccionActiva() {
  const [activa, setActiva] = useState("");

  useEffect(() => {
    const ids = SECCIONES.map((s) => s.id);

    const calcular = () => {
      let actual = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= 140) actual = id;
      });
      setActiva(actual);
    };

    calcular();
    window.addEventListener("scroll", calcular, { passive: true });
    window.addEventListener("resize", calcular);
    return () => {
      window.removeEventListener("scroll", calcular);
      window.removeEventListener("resize", calcular);
    };
  }, []);

  return activa;
}

export default function App() {
  const [tema, cambiarTema] = useTema();
  const activa = useSeccionActiva();

  return (
    <>
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
    </>
  );
}
