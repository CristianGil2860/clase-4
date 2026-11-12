import Section, { Reveal } from "./Section.jsx";
import Candado from "./Candado.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import { recursos } from "../data.js";
import { IconStar, IconDownload, IconArrow } from "./Icons.jsx";

/* SECCIÓN PRIVADA 2 — Recursos.
   Los datos salen de data.js, pero sólo se renderizan con sesión abierta. */
export default function Recursos() {
  const { usuario, logueado, guardarDatos } = useAuth();

  if (!logueado) {
    return (
      <Section id="recursos" eyebrow="Área privada" titulo="Recursos">
        <Reveal>
          <Candado que="Acá están el CV completo, los casos de estudio y el material que no publico en la parte abierta." />
        </Reveal>
      </Section>
    );
  }

  const favoritos = usuario.datos?.favoritos ?? [];

  const alternarFavorito = (id) => {
    const nuevos = favoritos.includes(id)
      ? favoritos.filter((f) => f !== id)
      : [...favoritos, id];

    guardarDatos({ favoritos: nuevos });
  };

  return (
    <Section
      id="recursos"
      eyebrow="Área privada"
      titulo="Recursos"
      sub="Material que comparto sólo con quien tiene cuenta. Marcá con la estrella lo que quieras tener a mano."
    >
      <div className="recursos">
        {recursos.map((r, i) => {
          const marcado = favoritos.includes(r.id);

          return (
            <Reveal key={r.id} delay={Math.min(i, 5) * 70}>
              <article className={"recurso" + (marcado ? " marcado" : "")}>
                <div className="recurso-top">
                  <span className="project-type">{r.tipo}</span>

                  <button
                    className={"fav" + (marcado ? " on" : "")}
                    onClick={() => alternarFavorito(r.id)}
                    aria-pressed={marcado}
                    aria-label={marcado ? `Quitar ${r.nombre} de favoritos` : `Marcar ${r.nombre} como favorito`}
                    title={marcado ? "Quitar de favoritos" : "Marcar como favorito"}
                  >
                    <IconStar />
                  </button>
                </div>

                <h3>{r.nombre}</h3>
                <p>{r.descripcion}</p>

                {r.url ? (
                  <a
                    className="btn btn-ghost"
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {r.descarga ? <IconDownload size={18} /> : <IconArrow />} {r.accion}
                  </a>
                ) : (
                  <span className="recurso-pendiente">{r.accion}</span>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="nota nota-pie">
          {favoritos.length === 0
            ? "Todavía no marcaste ninguno."
            : `Tenés ${favoritos.length} recurso${favoritos.length === 1 ? "" : "s"} marcado${
                favoritos.length === 1 ? "" : "s"
              }. Queda guardado en tu cuenta.`}
        </p>
      </Reveal>
    </Section>
  );
}
